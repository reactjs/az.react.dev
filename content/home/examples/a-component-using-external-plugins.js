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
<<<<<<< HEAD
    const md = new Remarkable();
    return {__html: md.render(this.state.value)};
=======
    return { __html: this.md.render(this.state.value) };
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9
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

ReactDOM.render(
  <MarkdownEditor />,
  document.getElementById('markdown-example'),
);
