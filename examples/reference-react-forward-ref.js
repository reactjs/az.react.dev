// highlight-range{1-2}
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// Siz indi DOM düyməsinə ref-i birbaşa əldə edə bilərsiniz:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
