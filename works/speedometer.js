export default class speedometer {
  constructor(defaultText) {
    this.box = document.createElement('div')
    this.box.id = 'box'
    this.box.style.padding = '6px 14px'
    this.box.style.top = '60px'
    this.box.style.right = '0'
    this.box.style.position = 'fixed'
    this.box.style.backgroundColor = 'rgba(100,100,255,0.3)'
    this.box.style.color = 'white'
    this.box.style.fontFamily = 'sans-serif'
    this.box.style.fontSize = '26px'

    this.textnode = document.createTextNode(defaultText)
    this.box.appendChild(this.textnode)
    document.body.appendChild(this.box)
  }
  changeMessage(newText) {
    this.textnode.nodeValue = newText
  }
  changeVisibility(newText) {
    this.box.style.visibility = newText
  }
}
