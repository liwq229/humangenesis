(() => {
  'use strict';

  // All panels remain readable when JavaScript is unavailable.
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabList = group.querySelector('.tab-list');
    const buttons = [...tabList.querySelectorAll('[data-tab]')];
    const panels = buttons.map((button) => document.getElementById(button.dataset.tab));
    tabList.setAttribute('role', 'tablist');

    const activate = (selectedIndex, focus = false) => {
      buttons.forEach((button, index) => {
        const selected = selectedIndex === index;
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
        panels[index].hidden = !selected;
        if (!selected) panels[index].querySelectorAll('video').forEach((video) => video.pause());
      });
      if (focus) buttons[selectedIndex].focus();
    };

    buttons.forEach((button, index) => {
      button.id = `tab-${button.dataset.tab}`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', panels[index].id);
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', button.id);
      panels[index].tabIndex = 0;
      button.addEventListener('click', () => activate(index));
      button.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          activate(next, true);
        }
      });
    });
    activate(0);
  });

  const dialog = document.getElementById('figure-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const enlarged = document.getElementById('enlarged-figure');
    const original = document.getElementById('figure-original');
    let trigger;
    document.querySelectorAll('[data-lightbox]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        trigger = link;
        enlarged.src = link.href;
        enlarged.alt = link.querySelector('img').alt;
        original.href = link.href;
        dialog.showModal();
        dialog.scrollTop = 0;
        document.body.classList.add('dialog-open');
      });
    });
    document.getElementById('close-figure').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      if (trigger) trigger.focus({ preventScroll: true });
    });
  }

  const copyButton = document.getElementById('copy-citation');
  const citation = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  if (copyButton && citation) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(citation.textContent.trim());
        copyButton.textContent = 'Copied ✓';
        status.textContent = 'BibTeX copied to clipboard.';
      } catch {
        const range = document.createRange();
        range.selectNodeContents(citation);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
      }
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.querySelectorAll('video').forEach((video) => video.pause());
  });
})();
