function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      // highlight-next-line
      const {forwardedRef, ...rest} = this.props;

      // Xüsusi prop "forwardedRef"-ı ref kimi təyin edin
      // highlight-next-line
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // Biz bunu LogProps-a müntəzəm prop kimi ötürə bilərik, məs. "forwardedRef"
  // Və sonra bu Komponent kimi qoşula bilər.
  // highlight-range{1-3}
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
