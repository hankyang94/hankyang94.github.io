// LaTeX shorthand used in the HTML sources. Edit/add macros here.
window.MathJax = {
  startup: {typeset: false},
  tex: {
    inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']],
    macros: {
      R: '\\mathbb R', Sn: '\\mathbb S', HH: '\\mathcal H', KK: '\\mathcal K',
      ZZ: '\\mathcal Z^\\star', XX: '\\mathcal X^\\star', region: '\\mathcal R',
      dist: '\\operatorname{dist}', Fix: '\\operatorname{Fix}', rank: '\\operatorname{rank}',
      ri: '\\operatorname{ri}', spanop: '\\operatorname{span}', ran: '\\operatorname{ran}', Id: '\\operatorname{Id}',
      norm: ['\\left\\lVert #1\\right\\rVert', 1], ip: ['\\langle #1,#2\\rangle', 2],
      blue: ['{\\color[RGB]{30,93,149}#1}', 1], red: ['{\\color[RGB]{164,35,58}#1}', 1],
      PSDproj: '\\Pi_{\\Sn_+^n}', frelu: 'f_{\\mathrm{ReLU}}', bm: ['\\boldsymbol{#1}', 1]
    }
  },
  svg: {fontCache: 'local'},
  options: {enableMenu: false}
};
