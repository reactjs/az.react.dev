class HelloMessage extends React.Component {
  render() {
    return <div>Salam {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Fuad" />);
