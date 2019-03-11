class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// FancyButton-u eksport etməkdənsə, biz LogProps eksport edirik.
// Buna baxmayaraq, bu FancyButton-u render edəcək.
// highlight-next-line
export default logProps(FancyButton);
