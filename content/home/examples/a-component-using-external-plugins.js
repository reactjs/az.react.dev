class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: 'Salam, **dünya**!'};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  getRawMarkup() {
    return {__html: this.md.render(this.state.value)};
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Daxiletmə</h3>
        <label htmlFor="markdown-content">Markdown daxil edin</label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <h3>Nəticə</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

<<<<<<< HEAD
ReactDOM.render(
  <MarkdownEditor />,
  document.getElementById('markdown-example'),
);
=======
root.render(<MarkdownEditor />);
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6
