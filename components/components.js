class SiteHeader extends HTMLElement {
  connectedCallback() {
    fetch("/components/header.html")
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    fetch("/components/footer.html")
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
