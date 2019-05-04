import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// ThemedButton-dan istifadə edən ara komponent
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    //highlight-range{1-3}
    // ThemeProvider-də olan ThemedButton düyməsi
    // state-də olan şablondan istifadə edərkən, xaricindəki komponent
    // default olan dark şablondan istifadə edir
    //highlight-range{3-5,7}
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
