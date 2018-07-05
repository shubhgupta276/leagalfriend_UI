import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService, UpcomingEvents } from '../../shared/services/shared.service'
import { Calender } from '../../shared/models/auth/calender.model';
import { ApiGateway } from '../../shared/services/api-gateway';
import { StorageService } from "../../shared/services/storage.service";
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
  arrEvents: any = [];
  arUpcomingEvents: any = [];
  isRemoveAfterDrop: boolean = false;
  constructor(private sharedService: SharedService, private _router: Router,
    private apiGateWay: ApiGateway, private _calenderService: CalenderService,
    private _storageService: StorageService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getEvent();
    var $this = this;
    var $calenderEvents = [];
    $(function () {

      /* initialize the external events
       -----------------------------------------------------------------*/
      function init_events(ele) {
        ele.each(function () {

          // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
          // it doesn't need to have a start or end
          let eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
          }

          // store the Event Object in the DOM element so we can get to it later
          $(this).data('eventObject', eventObject)

          // make the event draggable using jQuery UI
          $(this).draggable({
            zIndex: 1070,
            revert: true, // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
          })
        })
      }

      init_events($('#external-events div.external-event'))

      /* initialize the calendar
       -----------------------------------------------------------------*/
      //Date for the calendar events (dummy data)
      let date = new Date()
      let d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear()
      setTimeout(() => {
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
          //Random default events
          events: $this.arrEvents,
          timezone: 'local',
          ignoreTimezone: false,
          allDay: false,
          editable: true,
          droppable: true, // this allows things to be dropped onto the calendar !!!
          eventClick: function (event) {
            if (event.eventType == '') {

            }
            else if (event.eventType == '') {
              $this._router.navigate([]);
            }
            else {

            }
          },
          drop: function (date, allDay) { // this function is called when something is dropped
            saveEvent(date, allDay, this);
          },
          eventDrop: function (event, delta, revertFunc) {
            $this.updateEvent(event);
            BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
          },
        })


        function saveEvent(date, allDay, $dragged) {
          // retrieve the dropped element's stored Event Object
          let originalEventObject = $($dragged).data('eventObject')

          // we need to copy it, so that multiple events don't have a reference to the same object
          let copiedEventObject = $.extend({}, originalEventObject)

          // assign it the date that was reported
          copiedEventObject.start = date
          copiedEventObject.allDay = allDay
          copiedEventObject.backgroundColor = $($dragged).css('background-color')
          copiedEventObject.borderColor = $($dragged).css('border-color')

          const objEvent = new Calender();
          objEvent.startDate = $this.datePipe.transform(copiedEventObject.start, "yyyy-MM-dd 00:00:00");
          objEvent.eventName = copiedEventObject.title;
          objEvent.userId = parseInt($this._storageService.getUserId());

          $this._calenderService.saveEvent(objEvent).subscribe(
            result => {
              if (result.body.httpCode == 200) {
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)
                if ($this.isRemoveAfterDrop) {
                  $($dragged).remove()
                }
                BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
                $.toaster({ priority: 'success', title: 'Success', message: result.body.successMessage });
              } else {
                $.toaster({ priority: 'error', title: 'Error', message: result.body.failureReason });
              }
            },
            err => {
              console.log(err);
            });
        }

        BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
        /* ADDING EVENTS */
        let currColor = '#3c8dbc' //Red by default
        //Color chooser button
        let colorChooser = $('#color-chooser-btn')
        $('#color-chooser > li > a').click(function (e) {
          e.preventDefault()
          //Save color
          currColor = $(this).css('color')
          //Add color effect to button
          $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
        })
        $('#add-new-event').click(function (e) {
          e.preventDefault()
          //Get value and make sure it is not null
          let val = $('#new-event').val()
          if (val.length == 0) {
            return
          }
          //Create events
          let event = $('<div />')
          event.css({
            'background-color': currColor,
            'border-color': currColor,
            'color': '#fff'
          }).addClass('external-event')
          event.html(val)
          $('#external-events').prepend(event)

          //Add draggable funtionality
          init_events(event)

          //Remove event from text input
          $('#new-event').val('')
        })
      }, 500);

      function BindUpcomingEvents(data) {
        $this.sharedService.arrTodayCalendarEvents = [];
        $this.arUpcomingEvents = [];
        $.each(data, function (i, d) {
          if (d.start._d > new Date()) {
            $this.arUpcomingEvents.push({
              eventType: d.eventType,
              title: d.title,
              backgroundColor: $this.getEventBgColor(d.eventType),
              borderColor: '',
              color: "#fff"
            });
          }
          if (d.end != null) {
            if (d.end._isUTC)
              d.end._d = new Date(d.end._d.setDate(d.end._d.getDate() - 1));
          }
          $this.sharedService.arrTodayCalendarEvents.push({ startdate: new Date(d.start._d.setHours(0, 0, 0, 0)), endDate: new Date((d.end == null ? d.start : d.end)._d.setHours(0, 0, 0, 0)), cssClass: d.backgroundColor, totalUpcomingEvents: 0 })
        });
        $this.sharedService.GetEventsGroup();

      }

      function formatDate(dateString): any {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss');
      }
    })
  }

  updateEvent(data) {
    const reqData = {
      startDate: this.datePipe.transform(data.start._d, "yyyy-MM-dd 00:00:00"),
      endDate: this.datePipe.transform(data.start._d, "yyyy-MM-dd 00:00:00"),
      eventId: data.eventId,
      eventName: data.title,
      eventDescription: data.eventDescription,
      eventStatus: data.eventStatus,
      referenceNumber: data.referenceNumber,
      userId: this._storageService.getUserId()
    };
    this._calenderService.updateEvent(reqData).subscribe(
      (result) => {

        if (result.body.httpCode == 200) {
          $.toaster({ priority: 'success', title: 'Success', message: result.body.successMessage });
        }
        else {
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
    if (eventType == 'INDIVIDUAL_CASE') {
      return '#0073b7';
    }
    else if (eventType == 'INSTITUTIONAL_CASE') {
      return '#ff851b';
    }
    else if (eventType == 'INDIVIDUAL_EVENT') {
      return "#dd4b39";
    }
    return '';
  }

  getEvent() {
    var $this = this;
    this._calenderService.getEvent().subscribe(
      result => {
        this.arrEvents = [];
        if (result) {
          result.forEach(function (value) {
            $this.arrEvents.push({
              eventId: value.eventId,
              eventDescription: value.eventDescription,
              eventStatus: value.eventStatus,
              referenceNumber: value.referenceNumber,
              eventType: $this.convertToEventType(value.referenceNumber),
              title: value.eventName,
              start: value.startDate,
              backgroundColor: $this.getEventBgColor($this.convertToEventType(value.referenceNumber)),
              borderColor: '#f56954'
            });
          });
        }
      },
      err => {
        console.log(err);
      });
  }
}