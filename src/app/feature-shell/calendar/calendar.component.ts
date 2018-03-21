import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService, UpcomingEvents } from '../../shared/services/shared.service'
import { Calender } from '../../shared/models/auth/calender.model';
import { ApiGateway } from '../../shared/services/api-gateway';
import { StorageService } from "../../shared/services/storage.service";
import { AuthService } from '../../auth-shell/auth-shell.service';
import {CalenderService} from './calender.service';
import {CalenderEvent} from './calender-event';
import { DatePipe } from '@angular/common';
declare let $;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [StorageService, AuthService, DatePipe]
})
export class CalendarComponent implements OnInit {
  arrEvents: any = [];
  constructor(private sharedService: SharedService, private apiGateWay: ApiGateway, private authService: AuthService, private _storageService: StorageService, private datePipe: DatePipe) {
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
          var eventObject = {
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
      var date = new Date()
      var d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear()
      debugger
      setTimeout(() => {
        debugger
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
          drop: function (date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject')

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject)

            // assign it the date that was reported
            copiedEventObject.start = date
            copiedEventObject.allDay = allDay
            copiedEventObject.backgroundColor = $(this).css('background-color')
            copiedEventObject.borderColor = $(this).css('border-color')


            debugger

            const objEvent = new Calender();

            objEvent.startDate = $this.datePipe.transform(copiedEventObject.start, "yyyy-MM-dd 00:00:00");
            objEvent.eventName = copiedEventObject.title;
            objEvent.userId = parseInt(localStorage.getItem('client_id'));

            $this.authService.saveEvent(objEvent).subscribe(

              result => {
                debugger
                $.toaster({ priority: 'success', title: 'Success', message: 'Event created successfully' });
                console.log(result);
              },
              err => {
                console.log(err);
              });




            //$('#divUpcomingEvents').append('<li><span style="background-color:'+copiedEventObject.backgroundColor+';border-color:'+copiedEventObject.borderColor+'">'+copiedEventObject.title+'</span></li>')

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
              // if so, remove the element from the "Draggable Events" list
              $(this).remove()
            }
            BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
          },
          eventDrop: function (event, delta, revertFunc) {

            BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
          },
        })
      BindUpcomingEvents($('#calendar').fullCalendar('clientEvents'));
      debugger
      /* ADDING EVENTS */
      var currColor = '#3c8dbc' //Red by default
      //Color chooser button
      var colorChooser = $('#color-chooser-btn')
      $('#color-chooser > li > a').click(function (e) {
        e.preventDefault()
        //Save color
        currColor = $(this).css('color')
        //Add color effect to button
        $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
      })
      $('#add-new-event').click(function (e) {
        debugger
        e.preventDefault()
        //Get value and make sure it is not null
        var val = $('#new-event').val()
        if (val.length == 0) {
          return
        }
debugger
        //Create events
        var event = $('<div />')
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
    },500);
      function BindUpcomingEvents(data) {
        debugger
        $('#divUpcomingEvents').empty();
        $this.sharedService.arrTodayCalendarEvents = [];
        $.each(data, function (i, d) {
          this.totalUpcommingEvents = 0;
          if (d.start._d > new Date()) {
            this.totalUpcommingEvents++;
            $('#divUpcomingEvents').append('<div class="external-event" style="background-color:' + d.backgroundColor + ';border-color:' + d.borderColor + ';color:#fff;">' + d.title + '</div>')
          }
          // if (d.start._isUTC && d.start._d!=new Date())
          //   d.start._d = new Date(d.start._d.setDate(d.start._d.getDate() - 1) );
          if (d.end != null) {
            if (d.end._isUTC)
              d.end._d = new Date(d.end._d.setDate(d.end._d.getDate() - 1));
          }

          //  $this.sharedService.emitChange(15);
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


  getEvent() {
    var $this = this;

    var reqData = {
      userId: parseInt(localStorage.getItem('client_id')),
    };


    this.authService.getEvent(reqData).subscribe(

      result => {
        this.arrEvents = [];
        result.body.forEach(function (value) {
debugger
          $this.arrEvents.push({
            title: value.eventName,
            start: value.startDate,
            backgroundColor: '#f56954',
            borderColor: '#f56954'
          });

        });

        console.log(result);
      },
      err => {
        console.log(err);
      });
  }


}




