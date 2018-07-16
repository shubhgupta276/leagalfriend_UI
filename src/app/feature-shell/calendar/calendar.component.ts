import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service'
import { Calender } from '../../shared/models/auth/calender.model';
import { ApiGateway } from '../../shared/services/api-gateway';
import { StorageService } from '../../shared/services/storage.service';
import { CalenderService } from './calender.service';
import { CalenderEvent } from './calender-event';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
declare let $;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [StorageService, CalenderService, DatePipe]
})
export class CalendarComponent implements OnInit {
  arrEvents: any[] = [];
  arUpcomingEvents: any = [];
  isRemoveAfterDrop: boolean = false;
  eventStartDate: any;
  eventEndDate: any;
  selectedCalendarType: any = '';
  constructor(private sharedService: SharedService, private _router: Router,
    private apiGateWay: ApiGateway, private _calenderService: CalenderService,
    private _storageService: StorageService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.setCalendarStartEndDate(new Date());
    this.getEvent();
    this.bindFullCalendar();
  }

  bindFullCalendar() {
    const $this = this;
    function init_events(ele) {
      ele.each(function () {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        const eventObject = {
          title: $.trim($(this).text()) // use the element's text as the event title
        };

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject)

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex: 1070,
          revert: true, // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        });
      });
    }

    init_events($('#external-events div.external-event'))
    setTimeout(() => {
      $('#calendar').fullCalendar('destroy');
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
          today: 'today',
          month: 'month',
          week: 'week',
          day: 'day'
        },
        events: $this.arrEvents,
        timezone: 'local',
        ignoreTimezone: false,
        allDay: false,
        editable: true,
        dragRevertDuration: 0,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        eventClick: function (event) {
          if (event.eventType == 'INDIVIDUAL_CASE') {
            $this._router.navigate(['/admin/case', { caseId: event.referenceNumber.split('/')[2] }])
          }
        },
        drop: function (date, allDay) { // this function is called when something is dropped
          $this.saveEvent(date, allDay, this);
        },
        eventDrop: function (event, delta, revertFunc) {
          $this.updateEvent(event);
          $this.BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
        },
        eventResize: function (event, delta, revertFunc) {
          $this.updateEvent(event);
        },
        eventRender: function (event, element) {
          element.find('.fc-content .fc-title').attr('title', event.title);
          if (event.eventType === $this.convertToEventType(null)) {
            element.find('.fc-content').
              // tslint:disable-next-line:max-line-length
              append('<span class="closeon" title="Delete Event" style="float:right;margin-right: 6px;"> <i class="fa fa-trash"></i></span>');
          }
          element.find('.closeon').click(function () {
            $this.deleteEvent(event);
          });
        },
        eventAllow: function (dropLocation, draggedEvent) {
          if (draggedEvent.eventType === $this.convertToEventType(null)) {
            return true;
          }
          else {
            return false;
          }
        }
      });

      $('#calendar').fullCalendar('gotoDate', $this.eventStartDate);
      $('#calendar').fullCalendar('refresh');
      $('.fc-prev-button, .fc-next-button').click(function () {
        $this.setCalendarStartEndDate(new Date($('#calendar').fullCalendar('getDate').format()));
        $this.getEvent();
      });

      $this.BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));

      let currColor = this.getEventBgColor(this.convertToEventType(null));

      const colorChooser = $('#color-chooser-btn');
      $('#color-chooser > li > a').click(function (e) {
        e.preventDefault();
        // Save color
        currColor = $(this).css('color');
        // Add color effect to button
        $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor });
      });
      $('#add-new-event').click(function (e) {
        e.preventDefault();
        // Get value and make sure it is not null
        const val = $('#new-event').val();
        if (val.length === 0) {
          return;
        }
        // Create events
        const event = $('<div />');
        event.css({
          'background-color': currColor,
          'border-color': currColor,
          'color': '#fff'
        }).addClass('external-event')
        event.html(val);
        $('#external-events').prepend(event);

        // Add draggable funtionality
        init_events(event);

        // Remove event from text input
        $('#new-event').val('');
      });
    }, 500);
  }

  setCalendarStartEndDate(date: any) {
    this.eventStartDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
    this.eventEndDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
  }

  BindUpcomingEvents(data) {
    this.arUpcomingEvents = [];
    const $this = this;
    $.each(data, function (i, d) {
      // if (d.start._d > new Date()) {

      $this.arUpcomingEvents.push({
        eventId: d.eventId,
        eventType: d.eventType,
        title: d.title,
        startDate: d.start._d,
        backgroundColor: $this.getEventBgColor(d.eventType),
        borderColor: '',
        color: '#fff'
      });
      if (d.end != null) {
        if (d.end._isUTC) {
          d.end._d = new Date(d.end._d.setDate(d.end._d.getDate() - 1));
        }
      }
    });
  }

  formatDate(dateString): any {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss');
  }

  saveEvent(date, allDay, $dragged) {
    // retrieve the dropped element's stored Event Object
    const originalEventObject = $($dragged).data('eventObject');
    // we need to copy it, so that multiple events don't have a reference to the same object
    const copiedEventObject = $.extend({}, originalEventObject);

    // assign it the date that was reported
    copiedEventObject.start = date;
    copiedEventObject.allDay = allDay;
    copiedEventObject.backgroundColor = $($dragged).css('background-color');
    copiedEventObject.borderColor = $($dragged).css('border-color');

    const objEvent = new Calender();
    objEvent.endDate = this.datePipe.transform(copiedEventObject.start, 'yyyy-MM-dd 23:59:59');
    objEvent.eventName = copiedEventObject.title;
    objEvent.startDate = this.datePipe.transform(copiedEventObject.start, 'yyyy-MM-dd hh:mm:00');
    // tslint:disable-next-line:radix
    objEvent.userId = parseInt(this._storageService.getUserId());

    this._calenderService.saveEvent(objEvent).subscribe(
      result => {
        if (result.body.httpCode === 200) {
          copiedEventObject.eventId = result.body.id;
          copiedEventObject.eventType = this.convertToEventType(null),
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)
          if (this.isRemoveAfterDrop) {
            $($dragged).remove();
          }

          this.arrEvents.push({
            eventId: result.body.id,
            eventDescription: null,
            eventStatus: null,
            referenceNumber: null,
            eventType: this.convertToEventType(null),
            title: objEvent.eventName,
            start: objEvent.startDate,
            backgroundColor: this.getEventBgColor(this.convertToEventType(null)),
            borderColor: this.getEventBgColor(this.convertToEventType(null))
          });
          this.sharedService.upcomingEventChange(this.getCountUpcomingEvent());
          this.BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
          $.toaster({ priority: 'success', title: 'Success', message: result.body.successMessage });
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteEvent(data) {
    if (confirm('Are you sure to delete event?')) {
      this._calenderService.deleteEvent(data.eventId).subscribe(
        (result) => {
          if (result.httpCode === 200) {
            this.arrEvents.splice(this.arrEvents.findIndex(x => x.eventId == data.eventId), 1);
            this.arUpcomingEvents.splice(this.arUpcomingEvents.findIndex(x => x.eventId == data.eventId), 1);
            this.sharedService.upcomingEventChange(this.getCountUpcomingEvent());
            $('#calendar').fullCalendar('removeEvents', data._id);
            $.toaster({ priority: 'success', title: 'Success', message: result.successMessage });
          } else {
            $.toaster({ priority: 'error', title: 'Error', message: result.failureReason });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  updateEvent(data) {
    const endDate = (data.end) ? this.datePipe.transform(data.end._d, 'yyyy-MM-dd hh:mm:00') :
      this.datePipe.transform(data.start._d, 'yyyy-MM-dd 23:59:59');
    const reqData = {
      startDate: this.datePipe.transform(data.start._d, 'yyyy-MM-dd hh:mm:00'),
      endDate: endDate,
      eventId: data.eventId,
      eventName: data.title,
      eventDescription: data.eventDescription,
      eventStatus: data.eventStatus,
      referenceNumber: data.referenceNumber,
      userId: this._storageService.getUserId()
    };
    this._calenderService.updateEvent(reqData).subscribe(
      (result) => {
        if (result.body.httpCode === 200) {
          $.toaster({ priority: 'success', title: 'Success', message: result.body.successMessage });
        } else {
          $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  convertToEventType(referenceNumber): string {
    if (referenceNumber && referenceNumber.substr(0, 1).toUpperCase() == 'I') {
      return 'INDIVIDUAL_CASE';
    }
    else if (referenceNumber && referenceNumber.substr(0, 1).toUpperCase() == 'O') {
      return 'INSTITUTIONAL_CASE'
    }
    else {
      return 'INDIVIDUAL_EVENT';
    }
  }

  getEventBgColor(eventType): string {
    if (eventType === 'INDIVIDUAL_CASE') {
      return '#0073b7';
    } else if (eventType === 'INSTITUTIONAL_CASE') {
      return '#ff851b';
    } else if (eventType === 'INDIVIDUAL_EVENT') {
      return '#ff8254';
    }
    return '';
  }

  getCountUpcomingEvent(): any {
    const arIndividualCase = this.arrEvents.filter(x => x.eventType === 'INDIVIDUAL_CASE');
    const arInstitutionalCase = this.arrEvents.filter(x => x.eventType === 'INSTITUTIONAL_CASE');
    const arIndivisual = this.arrEvents.filter(x => x.eventType === 'INDIVIDUAL_EVENT');
    const arCount = [];
    arCount.push(arIndividualCase);
    arCount.push(arInstitutionalCase);
    arCount.push(arIndivisual);
    return arCount;
  }

  getEvent() {
    if (!this.eventStartDate) {
      this.setCalendarStartEndDate(new Date());;
    }
    this.arrEvents = [];
    const $this = this;
    this._calenderService.getEvent(this.eventStartDate, this.eventEndDate).subscribe(
      result => {
        if (result) {
          result.forEach(function (value) {
            $this.arrEvents.push({
              eventId: value.eventId,
              eventDescription: value.eventDescription,
              eventStatus: value.eventStatus,
              referenceNumber: value.referenceNumber,
              eventType: $this.convertToEventType(value.referenceNumber),
              title: (!value.referenceNumber) ? value.eventName : value.referenceNumber,
              start: value.startDate,
              backgroundColor: $this.getEventBgColor($this.convertToEventType(value.referenceNumber)),
              borderColor: $this.getEventBgColor($this.convertToEventType(value.referenceNumber))
            });
          });
          this.sharedService.upcomingEventChange(this.getCountUpcomingEvent());
          $('#calendar').fullCalendar('removeEvents');
          $('#calendar').fullCalendar('addEventSource', this.arrEvents);
          this.BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));

        }

      },
      err => {
        console.log(err);
      });
  }
}
