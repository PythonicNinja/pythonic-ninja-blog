import mermaid from 'mermaid';

function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ||
    (document.documentElement.getAttribute('data-theme') !== 'light' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function getMermaidConfig() {
  const dark = isDarkMode();
  return {
    startOnLoad: false,
    theme: dark ? 'dark' : 'base',
    securityLevel: 'loose',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: false,
      curve: 'basis'
    },
    ...(dark && {
      themeVariables: {
        primaryColor: '#3d4a4a',
        primaryTextColor: '#ece9e2',
        primaryBorderColor: '#67665f',
        lineColor: '#a6a39e',
        secondaryColor: '#1a1d1f',
        tertiaryColor: '#262a2e',
        background: '#0f1113',
        mainBkg: '#1a1d1f',
        secondBkg: '#262a2e',
        border1: '#67665f',
        border2: '#a6a39e',
        arrowheadColor: '#a6a39e',
        fontColor: '#ece9e2',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    })
  };
}

function adaptCodeForTheme(code) {
  if (!isDarkMode()) return code;
  return code
    .replace(/classDef good fill:#284a4a[^\n]+/g, 'classDef good fill:#284a4a,stroke:#67665f,color:#ece9e2')
    .replace(/classDef state fill:#3d6b6b[^\n]+/g, 'classDef state fill:#3d6b6b,stroke:#67665f,color:#ece9e2')
    .replace(/%%\{init:[^}]+\}%%/g, "%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor':'#262a2e', 'primaryTextColor':'#ece9e2', 'primaryBorderColor':'#67665f', 'lineColor':'#a6a39e', 'secondaryColor':'#1a1d1f', 'tertiaryColor':'#262a2e', 'background':'#0f1113', 'mainBkg':'#1a1d1f', 'secondBkg':'#262a2e', 'border1':'#67665f', 'border2':'#a6a39e', 'arrowheadColor':'#a6a39e', 'fontFamily':'Inter, system-ui, sans-serif' }}}%%");
}

function renderMermaid() {
  const pres = document.querySelectorAll('pre[data-language="mermaid"]');
  if (pres.length === 0) return;
  mermaid.initialize(getMermaidConfig());
  pres.forEach((parent, i) => {
    const codeEl = parent.querySelector('code');
    const rawCode = codeEl ? codeEl.textContent : parent.textContent;
    if (!rawCode?.trim()) return;
    const code = adaptCodeForTheme(rawCode);
    const id = `mermaid-${i}-${Date.now()}`;
    try {
      mermaid.render(id, code).then(({ svg }) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'mermaid-wrapper';
        wrapper.setAttribute('data-mermaid-src', rawCode);
        const dark = isDarkMode();
        if (dark) wrapper.setAttribute('data-theme', 'dark');
        wrapper.innerHTML = svg;
        if (dark) {
          wrapper.querySelectorAll('text, tspan').forEach(el => el.setAttribute('fill', '#ece9e2'));
          wrapper.querySelectorAll('foreignObject').forEach(fo => {
            fo.style.color = '#ece9e2';
            fo.querySelectorAll('*').forEach(el => { el.style.color = '#ece9e2'; });
          });
        }
        parent.replaceWith(wrapper);
      }).catch(() => {
        parent.classList.add('mermaid-error');
      });
    } catch {
      parent.classList.add('mermaid-error');
    }
  });
}

function reRenderOnThemeChange() {
  const wrappers = document.querySelectorAll('.mermaid-wrapper[data-mermaid-src]');
  if (wrappers.length === 0) return;
  wrappers.forEach(w => {
    const pre = document.createElement('pre');
    pre.setAttribute('data-language', 'mermaid');
    const code = document.createElement('code');
    code.textContent = w.getAttribute('data-mermaid-src') || '';
    pre.appendChild(code);
    w.replaceWith(pre);
  });
  renderMermaid();
}

function initMermaid() {
  renderMermaid();
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.attributeName === 'data-theme')) {
      reRenderOnThemeChange();
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMermaid);
} else {
  initMermaid();
}
