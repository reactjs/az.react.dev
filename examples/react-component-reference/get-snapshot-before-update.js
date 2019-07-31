class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Siyahıya yeni elementlər əlavə edirik?
    // Skrolu sonra nizamlamaq üçün, skrol pozisiyasını yaxalayaq.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Əgər bizdə snapshot dəyəri varsa, biz yeni elementlər əlavə etdik.
    // Yeni elementlərin keçmiş elementləri ekrandan kənara çıxarmaması üçün skrolu nizamlayaq.
    // ("snapshot" getSnapshotBeforeUpdate-dən qaytarılan snapshot dəyəridir)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...məzmun... */}</div>
    );
  }
}
