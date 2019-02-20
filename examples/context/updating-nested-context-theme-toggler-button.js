import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // highlight-range{1-2,5}
  // Theme Toggler Button theme-dən əlavə
  // toggleTheme funskiyasını da kontekstdan qəbul edir
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
