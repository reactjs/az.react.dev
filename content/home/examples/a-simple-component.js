class HelloMessage extends React.Component {
  render() {
    return <div>Salam {this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="Fuad" />,
  document.getElementById('hello-example'),
);
