import FancyButton from './FancyButton';

// highlight-next-line
const ref = React.createRef();

// Bizim import etmidiyimiz FancyButton komponenti LogProps HOC-dur.
// Hətta renden edilmiş nəticə də eyni olacaq,
// Bizin ref daxili FancyButton komponentin yerinə LogProps işarə edəcək!
// Bu deməkdir ki, biz məsələn ref.current.focus() çağıra bilmərik
// highlight-range{4}
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
