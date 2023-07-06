import { format } from 'date-fns-tz'

export const getXaxisConfig = (
    xaxisVariable,
    dateDisplayFormatString,
    xAxisLeftPadding,
    xAxisRightPadding,
    scale = 'time',
  ) => {
    return {
      dataKey: xaxisVariable,
      hasTick: true,
      name: 'Date',
      scale,
      type: 'category',
      padding: { left: xAxisLeftPadding, right: xAxisRightPadding },
      tick: { fill: 'black', fontSize: '0.90rem' },
      tickFormatter: (date) => {
        return format(
          new Date(date),
          dateDisplayFormatString,
          {
            timeZone: 'UTC',
          },
        )
      },
    }
  }

export function transformData(data) {
    const transformedData = [];
    for (const date in data.cases) {
      transformedData.push({
        date: new Date(date),
        cases: data.cases[date],
        deaths: data.deaths[date],
        recovered: data.recovered[date],
      });
    }
    return transformedData;
  }