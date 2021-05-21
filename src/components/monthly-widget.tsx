import React, {useContext} from "react";
import {UsageReportMonth} from "../group-entries";
import {LineChart, Line, YAxis} from 'recharts';
import {groupEntriesPerDay} from "../group-entries";
import {WidgetContext} from "./widget-context";

interface MonthlyWidgetProps {
    monthlyEntry: UsageReportMonth;
    maxValueOfYAxis: number
}

export const MonthlyWidget = ({monthlyEntry, maxValueOfYAxis}: MonthlyWidgetProps): JSX.Element => {
    const {activeMonth, setActiveMonth} = useContext(WidgetContext)
    const entriesGroupedPerDay = groupEntriesPerDay(monthlyEntry.entries)

    return (
        <div style={activeMonth.monthName === monthlyEntry.monthName? {margin: "10px", border: "1px solid black"} : {margin: "10px", border: "1px solid white"}}
             onClick={() => setActiveMonth(monthlyEntry.monthName, monthlyEntry.entries)}>
            <div>
                <h4>{monthlyEntry.monthName}</h4>
                <p>{`${Math.round(monthlyEntry.totalPrice * 100) / 100} $`}</p>
            </div>
            <LineChart
                width={100}
                height={50}
                data={entriesGroupedPerDay}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <YAxis hide={true} domain={[0, maxValueOfYAxis]}/>
                <Line type="monotone" dataKey="totalPrice" stroke="#82ca9d" dot={false}/>

            </LineChart>
        </div>
    )
}