import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SharedService, UpcomingEvents } from '../../shared/services/shared.service'
import {CalenderService} from './calender.service';
import {CalenderEvent} from './calender-event';
import { DatePipe } from '@angular/common';
declare let $;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [CalenderService, DatePipe]
})
export class CalendarComponent implements OnInit {

  public calenderEvent : CalenderEvent;
  public datepipe: DatePipe;  
  arrCalendarEvents: any = [];
//arrEvents: any = [];
  constructor(private sharedService: SharedService, private calenderService: CalenderService) {
     const datepipe2: DatePipe = new DatePipe('en-US');
     this.datepipe = datepipe2;          
  }

  ngOnInit() {
    this.getUsersCalenderEvent(+localStorage.getItem('client_id'));
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
        events: $this.arrCalendarEvents,
        //timezone: 'local',
        //ignoreTimezone: false,
        //allDay: false,
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
          // Add calender event into db         
          var eventName = originalEventObject.title;
          var eventDescription = originalEventObject.title;          
          let eventStartDate = formatDate(date._d);              
          var eventEndDate = formatDate(date._d);
          const calenderEvent = new CalenderEvent();
          calenderEvent.eventName = eventName;
          calenderEvent.eventDescription = eventName;
          calenderEvent.startDate = eventStartDate;
          calenderEvent.endDate = eventEndDate;
          calenderEvent.userId = +localStorage.getItem('client_id');
          calenderEvent.eventStatus = 'CREATED'
           addCalenderEvent(calenderEvent);

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
        e.preventDefault()
        //Get value and make sure it is not null
        var val = $('#new-event').val()
        if (val.length == 0) {
          return
        }

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
              d.end._d = new Date(d.end._d.setDate(d.end._d.getDate() - 1) );
          }

          //  $this.sharedService.emitChange(15);
          $this.sharedService.arrTodayCalendarEvents.push({ startdate: new Date(d.start._d.setHours(0, 0, 0, 0)), endDate: new Date((d.end == null ? d.start : d.end)._d.setHours(0, 0, 0, 0)), cssClass: d.backgroundColor, totalUpcomingEvents: 0 })
        });
        $this.sharedService.GetEventsGroup();

      }
     

    
      function addCalenderEvent(calenderEvent : CalenderEvent) {           
        $this.calenderService.addCalenderEvent(calenderEvent).subscribe(
      result => {debugger
        console.log(result);       
      },
      err => {
        console.log(err);
      });      
    }
    
    function formatDate(dateString): any {
       const datepipe: DatePipe = new DatePipe('en-US');
       return datepipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss');
    }

    })
  }

  getUsersCalenderEvent(userId: Number) {        
        this.calenderService.getUsersCalenderEvent(userId).subscribe(
      result => {
        this.arrCalendarEvents = [];
for (let value of result) {
this.arrCalendarEvents.push({
title: value.eventName,
start: value.startDate,
backgroundColor: '#f56954',
borderColor: '#f56954'
});

}

console.log(result);         
      },
      err => {
        console.log(err);
      });       
    }
  

}

