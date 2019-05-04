import FancyButton from './FancyButton';

// highlight-next-line
const ref = React.createRef();

// Bizim import etmidiyimiz FancyButton komponenti LogProps HOC-dur.
// Hətta renden edilmiş nəticə də eyni olacaq,
// Bizim ref-imiz daxili FancyButton komponentinin yerinə LogProps-a işarə edəcək!
// Bu deməkdir ki, biz məsələn ref.current.focus() çağıra bilmərik
// highlight-range{4}
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
