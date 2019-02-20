class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // highlight-range{1-4,7}
  // Toolbar komponenti əlavə "theme" propu qəbul etməli və
  // bu propu ThemedButton komponentinə göndərməlidir. Applikasiyada hər bir
  // düymənin şablondan xəbəri olması üçün, "theme" propunu bütün
  // komponentlərdən keçmirmək çox yorucu ola biler.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
