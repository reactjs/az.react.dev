function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('köhnə proplar:', prevProps);
      console.log('yeni proplar:', this.props);
    }

    render() {
      // highlight-next-line
      const {forwardedRef, ...rest} = this.props;

      // Xüsusi prop "forwardedRef"-ı ref kimi təyin edin
      // highlight-next-line
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Nəzər alın ki, ikinci "ref" parametri React.forwardRef. tərəfindən təqdim olunub.
  // Biz bunu LogProps-a müntəzəm prop kimi ötürə bilərik, məs. "forwardedRef"
  // Və sonra bu Komponent kimi qoşula bilər.
  // highlight-range{1-3}
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
