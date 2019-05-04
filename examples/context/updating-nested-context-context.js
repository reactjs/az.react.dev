// createContext-də işlənən default dəyərin forması
// Consumer-lərin gözlədiyi dəyərdir!
// highlight-range{2-3}
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
