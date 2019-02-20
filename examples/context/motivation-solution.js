// highlight-range{1-4}
// Kontekst dəyərləri komponent ağacında hər komponentdən
// keçmədən lazım olan komponentə ötürməyə icazə verir.
// Cari şablon üçün yeni bir kontext yarat ("light" default dəyər kimi).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // highlight-range{1-3,5}
    // Provider-dan istifadə edərək cari şablon dəyərini aşağıdakı ağaca göndərin.
    // Dərinlikdən asılı olmayaraq, hər hansı bir komponent bu dəyəri oxuya bilər.
    // Bu misalda, biz "dark" yazısını cari dəyər kimi göndəririk.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// highlight-range{1,2}
// Ortadakl komponent artıq
// şablon dəyərini açıq şəkildə göndərməməlidir.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // highlight-range{1-3,6}
  // cari şablon kontekstindən oxumaq üçün contextType təyin edin.
  // React ən yaxın olan şablon Provider-i tapıb kontekstin dəyərindən istifadə edəcək.
  // Bu misalda, cari şablonun dəyəri "dark"-dır.
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
