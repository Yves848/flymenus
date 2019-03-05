import * as React from "react";
import { Component } from "react";

import * as moment from "moment";

export interface CalendarProps {
  date: any;
  onChange(): void;
}

export interface CalendarState {}

class Calendar extends Component<CalendarProps, CalendarState> {
  state = {
    date: moment()
  };
  render() {
    return (
      <div className="row">
        <div className="col">Lun.</div>
        <div className="col">Mar.</div>
        <div className="col">Mer.</div>
        <div className="col">Jeu.</div>
        <div className="col">Ven.</div>
        <div className="col">Sam.</div>
        <div className="col">Dim.</div>
        
      </div>
    );
  }
}

export default Calendar;
