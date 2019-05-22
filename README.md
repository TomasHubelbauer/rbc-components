# React Big Calendar Components

I find the [React Big Calendar documentation](http://intljusticemission.github.io/react-big-calendar/examples/index.html#api)
to be severely lacking and I often like to review the [RBC typings](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-big-calendar/index.d.ts)
to find not only what the actual API surface is like, but also what types do individual props and fields have.

These typings are more up to date than the RBC documentation, but are not complete
either and proposed changes to them should be backed by documentation which being
not up-to-date makes contributing less than straight-forward.

There are also things the typings cannot capture. A concrete example of this would
be the `eventContainerWrapper` field of the `components` prop. This field is unused
when the view mode of the calendar is `month`. But this is not captured anywhere
in the documentation or the types. It's also not super obvious, so that's a bit
annoying.

I decided to come up with a third way of exploring the API surface of RBC, one that
is less formal than the typings contribution process (i.e. will contain undocumented
and possible internal props, fields and methods, which I don't mind as long as they
work as expected and the RBC package version is locked so they don't go away without
and audit) and more complete than both the RBC documentation and the typings.

For a given version of RBC (in my case, latest), a JavaScript proxy object is
supplied to the calendar's `components` prop. The various view modes are then
iterated and whatever getters are hit are captured, including the structure of
the parameters it was called with.

This gives a true and complete picture of RBC props, specifically `components`.

---

To do this, a new Create React App project is scaffolded using
`npx create-react-app . --typescript` and RBC is installed using
`npm install --save react-big-calendar moment` (to include Moment as a localizer
library) and `npm install --save-dev @types/react-big-calendar` (Moment bundles
its own types, as any library should).

Next, `BigCalendar` is initialized for each of the view names I am interested in
and the `components` prop is set to a proxy, which returns a dummy component for
each object field. In case of override fields (named after view names), instead
of a component, a nested proxy is returned. A tree is constructed which collects
information about the names of the getters called and the tree is turned into a
MarkDown string for pasting into this README.

---

What follows is the collection of `components` values checked by RBC latest at
the time of writing:

## `month` view `components`

- field `event`
- field `eventWrapper`
- field `eventContainerWrapper`
- field `dayWrapper`
- field `dateCellWrapper`
- field `timeSlotWrapper`
- field `timeGutterHeader`
- field `resourceHeader`
- field `toolbar`
- field `agenda`
  - field `date`
  - field `time`
  - field `event`
- field `day`
  - field `header`
  - field `event`
- field `week`
  - field `header`
  - field `event`
- field `month`
  - field `header`
    - prop `date`
    - prop `localizer`
    - prop `label`
  - field `dateHeader`
    - prop `label`
    - prop `date`
    - prop `drilldownView`
    - prop `isOffRange`
    - prop `onDrillDown`
  - field `event`
    - prop `event`
    - prop `title`
    - prop `isAllDay`
    - prop `localizer`
  - field `eventWrapper`
    - prop `event`
    - prop `getters`
    - prop `localizer`
    - prop `accessors`
    - prop `components`
    - prop `onSelect`
    - prop `onDoubleClick`
    - prop `continuesPrior`
    - prop `continuesAfter`
    - prop `selected`
    - prop `type`
    - prop `children`
  - field `eventContainerWrapper`
  - field `dayWrapper`
  - field `dateCellWrapper`
    - prop `value`
    - prop `range`
    - prop `children`
  - field `weekWrapper`
    - prop `isAllDay`
    - prop `selected`
    - prop `accessors`
    - prop `getters`
    - prop `localizer`
    - prop `components`
    - prop `onSelect`
    - prop `onDoubleClick`
    - prop `resourceId`
    - prop `slotMetrics`
    - prop `children`
  - field `timeSlotWrapper`
  - field `toolbar`
    - prop `date`
    - prop `view`
    - prop `views`
    - prop `label`
    - prop `onView`
    - prop `onNavigate`
    - prop `localizer`

## `week` view `components`

- field `event`
- field `eventWrapper`
- field `eventContainerWrapper`
- field `dayWrapper`
- field `dateCellWrapper`
- field `timeSlotWrapper`
- field `timeGutterHeader`
- field `resourceHeader`
- field `toolbar`
- field `agenda`
  - field `date`
  - field `time`
  - field `event`
- field `day`
  - field `header`
  - field `event`
- field `week`
  - field `header`
    - prop `date`
    - prop `label`
    - prop `localizer`
  - field `event`
    - prop `event`
    - prop `title`
  - field `eventWrapper`
    - prop `type`
    - prop `style`
    - prop `event`
    - prop `label`
    - prop `getters`
    - prop `isRtl`
    - prop `components`
    - prop `continuesEarlier`
    - prop `continuesLater`
    - prop `accessors`
    - prop `selected`
    - prop `onClick`
    - prop `onDoubleClick`
    - prop `children`
  - field `eventContainerWrapper`
    - prop `localizer`
    - prop `resource`
    - prop `accessors`
    - prop `getters`
    - prop `components`
    - prop `slotMetrics`
    - prop `children`
  - field `dayWrapper`
  - field `dateCellWrapper`
    - prop `value`
    - prop `range`
    - prop `children`
  - field `weekWrapper`
    - prop `isAllDay`
    - prop `selected`
    - prop `accessors`
    - prop `getters`
    - prop `localizer`
    - prop `components`
    - prop `onSelect`
    - prop `onDoubleClick`
    - prop `resourceId`
    - prop `slotMetrics`
    - prop `children`
  - field `timeSlotWrapper`
    - prop `value`
    - prop `resource`
    - prop `children`
  - field `toolbar`
    - prop `date`
    - prop `view`
    - prop `views`
    - prop `label`
    - prop `onView`
    - prop `onNavigate`
    - prop `localizer`
  - field `timeGutterHeader`
  - field `resourceHeader`
- field `month`
  - field `header`
  - field `dateHeader`
  - field `event`

## `day` view `components`

- field `event`
- field `eventWrapper`
- field `eventContainerWrapper`
- field `dayWrapper`
- field `dateCellWrapper`
- field `timeSlotWrapper`
- field `timeGutterHeader`
- field `resourceHeader`
- field `toolbar`
- field `agenda`
  - field `date`
  - field `time`
  - field `event`
- field `day`
  - field `header`
    - prop `date`
    - prop `label`
    - prop `localizer`
  - field `event`
    - prop `event`
    - prop `title`
  - field `eventWrapper`
    - prop `type`
    - prop `style`
    - prop `event`
    - prop `label`
    - prop `getters`
    - prop `isRtl`
    - prop `components`
    - prop `continuesEarlier`
    - prop `continuesLater`
    - prop `accessors`
    - prop `selected`
    - prop `onClick`
    - prop `onDoubleClick`
    - prop `children`
  - field `eventContainerWrapper`
    - prop `localizer`
    - prop `resource`
    - prop `accessors`
    - prop `getters`
    - prop `components`
    - prop `slotMetrics`
    - prop `children`
  - field `dayWrapper`
  - field `dateCellWrapper`
    - prop `value`
    - prop `range`
    - prop `children`
  - field `weekWrapper`
    - prop `isAllDay`
    - prop `selected`
    - prop `accessors`
    - prop `getters`
    - prop `localizer`
    - prop `components`
    - prop `onSelect`
    - prop `onDoubleClick`
    - prop `resourceId`
    - prop `slotMetrics`
    - prop `children`
  - field `timeSlotWrapper`
    - prop `value`
    - prop `resource`
    - prop `children`
  - field `toolbar`
    - prop `date`
    - prop `view`
    - prop `views`
    - prop `label`
    - prop `onView`
    - prop `onNavigate`
    - prop `localizer`
  - field `timeGutterHeader`
  - field `resourceHeader`
- field `week`
  - field `header`
  - field `event`
- field `month`
  - field `header`
  - field `dateHeader`
  - field `event`

## `agenda` view `components`

- field `event`
- field `eventWrapper`
- field `eventContainerWrapper`
- field `dayWrapper`
- field `dateCellWrapper`
- field `timeSlotWrapper`
- field `timeGutterHeader`
- field `resourceHeader`
- field `toolbar`
- field `agenda`
  - field `date`
  - field `time`
  - field `event`
  - field `eventWrapper`
  - field `eventContainerWrapper`
  - field `dayWrapper`
  - field `dateCellWrapper`
  - field `weekWrapper`
  - field `timeSlotWrapper`
  - field `toolbar`
    - prop `date`
    - prop `view`
    - prop `views`
    - prop `label`
    - prop `onView`
    - prop `onNavigate`
    - prop `localizer`
- field `day`
  - field `header`
  - field `event`
- field `week`
  - field `header`
  - field `event`
- field `month`
  - field `header`
  - field `dateHeader`
  - field `event`
