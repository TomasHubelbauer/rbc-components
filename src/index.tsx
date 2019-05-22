import './index.css';
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { render } from 'react-dom';

const localizer = BigCalendar.momentLocalizer(moment);
const events = [
  {
    title: 'First',
    start: moment().startOf('day').set({ hour: 0 }).toDate(),
    end: moment().startOf('day').set({ hour: 3 }).toDate(),
  },
  {
    title: 'Second',
    start: moment().startOf('day').set({ hour: 5 }).toDate(),
    end: moment().startOf('day').set({ hour: 7 }).toDate(),
  },
  {
    title: 'Third',
    start: moment().startOf('day').set({ hour: 9 }).toDate(),
    end: moment().startOf('day').set({ hour: 10 }).toDate(),
  },
];

let views: { title: string; items: { title: string; subitems: { title: string; props: string[]; }[]; }[] }[] = [];
for (const defaultView of ['month', 'week', 'day', 'agenda'] as const) {
  let view = views.find(v => v.title === defaultView)!;
  if (!view) {
    view = { title: defaultView, items: [] };
    views.push(view);
  }

  const components = new Proxy({}, {
    // eslint-disable-next-line
    get(_target, p, _receiver) {
      if (p === '@@toStringTag' || p === 'length' || p === 'constructor') {
        return undefined;
      }

      let item = view.items.find(i => i.title === p.toString())!;
      if (!item) {
        item = { title: p.toString(), subitems: [] };
        view.items.push(item);
      }

      if (p === 'month' || p === 'week' || p === 'day' || p === 'agenda') {
        return new Proxy({}, {
          get(_target, p2, _receiver) {
            if (p2 === '@@toStringTag' || p2 === 'length' || p2 === 'constructor') {
              return undefined;
            }

            let subitem = item.subitems.find(s => s.title === p2.toString())!;
            if (!subitem) {
              subitem = { title: p2.toString(), props: [] };
              item.subitems.push(subitem);
            }

            return class extends Component {
              render() {
                for (const key of Object.keys(this.props)) {
                  if (!subitem.props.includes(key)) {
                    subitem.props.push(key);
                  }
                }

                return this.props.children || null;
              }
            };
          }
        });
      }

      return class extends Component {
        render() {
          return this.props.children || null;
        }
      };
    },
  });

  const calendar = <BigCalendar localizer={localizer} events={events} components={components} defaultView={defaultView} />;
  render(calendar, document.createElement('div'));
}

let markdown = '';
for (const view of views) {
  markdown += `## \`${view.title}\` view \`components\`\n\n`;
  for (const item of view.items) {
    markdown += `- field \`${item.title}\`\n`;
    for (const subitem of item.subitems) {
      markdown += `  - field \`${subitem.title}\`\n`;
      for (const prop of subitem.props) {
        markdown += `    - prop \`${prop}\`\n`;
      }
    }
  }

  markdown += '\n';
}

document.body.textContent = markdown;
