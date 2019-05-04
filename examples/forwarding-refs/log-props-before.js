// highlight-next-line
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('köhnə proplar:', prevProps);
      console.log('yeni proplar:', this.props);
    }

    render() {
      // highlight-next-line
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
