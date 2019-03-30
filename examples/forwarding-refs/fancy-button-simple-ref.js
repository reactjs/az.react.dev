// highlight-range{1-2}
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// İndi siz ref-i birdəfəlik DOM button-a ötürə bilərsiniz:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
