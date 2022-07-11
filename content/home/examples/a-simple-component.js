class HelloMessage extends React.Component {
  render() {
<<<<<<< HEAD
    return <div>Salam {this.props.name}</div>;
  }
}

ReactDOM.render(
  <HelloMessage name="Fuad" />,
  document.getElementById('hello-example'),
);
=======
    return <div>Hello {this.props.name}</div>;
  }
}

root.render(<HelloMessage name="Taylor" />);
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e
