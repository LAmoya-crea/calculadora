var Screen = React.createClass({ displayName: "Screen",
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { id: "display" }, /*#__PURE__*/
      React.createElement("span", { className: "clean", onClick: this.props.onClickClean }, "x"),
      this.props.displayText));


  } });


var Inputs = React.createClass({ displayName: "Inputs",
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { id: "inputs" }, /*#__PURE__*/
      React.createElement(Numbers, { onClick: this.props.onClickOperando, onClickTotal: this.props.onClickOperador }), /*#__PURE__*/
      React.createElement(Operations, { onClick: this.props.onClickOperador })));


  } });


var Numbers = React.createClass({ displayName: "Numbers",
  getInitialState: function () {
    return {
      buttons: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'] };

  },
  render: function () {
    var buttonElements = [];
    for (var i = 0; i < this.state.buttons.length; i++) {
      buttonElements.push( /*#__PURE__*/
      React.createElement(Button, { label: this.state.buttons[i], onClick: this.props.onClick }));

    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "numbers" },
      buttonElements, /*#__PURE__*/
      React.createElement(Button, { label: "=", onClick: this.props.onClickTotal, className: "greenBtn" })));


  } });


var Operations = React.createClass({ displayName: "Operations",
  getInitialState: function () {
    return {
      buttons: ['+', '-', '/', 'x'] };

  },
  render: function () {
    var buttonElements = [];
    for (var i = 0; i < this.state.buttons.length; i++) {
      buttonElements.push( /*#__PURE__*/
      React.createElement(Button, { label: this.state.buttons[i], onClick: this.props.onClick }));

    }
    return /*#__PURE__*/(
      React.createElement("div", { id: "operations" },
      buttonElements));


  } });


var Button = React.createClass({ displayName: "Button",
  render: function () {
    var classes = ['defaultButton'];
    classes.push(this.props.className);
    return /*#__PURE__*/(
      React.createElement("button", { type: "button", className: classes.join(' '), onClick: e => this.props.onClick(e, this.props.label) },
      this.props.label));


  } });


var Container = React.createClass({ displayName: "Container",
  getInitialState: function () {
    return {
      operando: '',
      operador: '',
      display: '0',
      resultDisplayed: false };

  },
  onClickOperando: function (e, label) {
    if (this.state.display == '0' || isNaN(this.state.display) || this.state.resultDisplayed) {
      var display = label;
      this.setState({ resultDisplayed: false });
    } else {
      var display = this.state.display + label;
    }

    this.setState({ display: display });
  },
  onClickOperador: function (e, label) {
    if (this.state.operador.length > 0) {
      this.calculate();
      if (label == '=') {
        this.setState({
          resultDisplayed: true,
          operador: '' });

      } else {
        this.setState({
          resultDisplayed: true,
          operador: label });

      }
    } else {
      this.setState({
        operando: this.state.display,
        operador: label,
        display: label });

    }
  },
  onClickClean: function () {
    this.setState(this.getInitialState);
  },
  calculate: function () {var displayResult;
    switch (this.state.operador) {
      case '+':
        displayResult = parseFloat(this.state.operando) + parseFloat(this.state.display);
        break;
      case '-':
        displayResult = parseFloat(this.state.operando) - parseFloat(this.state.display);
        break;
      case '/':
        displayResult = parseFloat(this.state.operando) / parseFloat(this.state.display);
        break;
      case 'x':
        displayResult = parseFloat(this.state.operando) * parseFloat(this.state.display);
        break;}

    this.setState({
      operando: displayResult,
      display: displayResult });

  },
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { id: "container" }, /*#__PURE__*/
      React.createElement(Screen, { displayText: this.state.display, onClickClean: this.onClickClean }), /*#__PURE__*/
      React.createElement(Inputs, { onClickOperando: this.onClickOperando, onClickOperador: this.onClickOperador })));


  } });


React.render( /*#__PURE__*/React.createElement(Container, null), document.getElementById('calculadora'));