import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "span", "fileInput", "tab", "prevBtn", "nextBtn" ]

  initialize() {
    // Current tab is set to be the first tab -> 0
    this.showCurrentTab(0);
  }

  nextPrev(e) {
    // if the form is valid then go to the next tab else don't
    let valid = true;
    $('input:visible, select:visible').each(function() {
      const settings = window[this.form.id].ClientSideValidations.settings;
      if (!$(this).isValid(settings.validators)) {
        valid = false
      }
    });
    if (valid) {
      //code to go to next step
      if (e.currentTarget.id === "nextBtn") this.index++;
    }
    if (e.currentTarget.id === "prevBtn") {
      if (this.index === 0) return;
      this.index--
    }
    // if the user reached the end of the form
    if (this.index >= this.tabTargets.length) {
      // the form will be submitted before showCurrentTab was called
      this.element.submit();

      return;
    }
    this.showCurrentTab(this.index);
  }

  showCurrentTab(index) {
    this.index = index; // index who communicates with nextPrev
    this.tabTargets.forEach((el, i) => {
      el.classList.toggle("current-tab", this.index == i) // displayig the speciefied tab of the form
    })
    // Fixing Prev/Next buttons
    index === 0 ? this.prevBtnTarget.style.display = "none" : this.prevBtnTarget.style.display = "flex"
    index === (this.tabTargets.length - 1) ? this.nextBtnTarget.innerHTML = "Submit" : this.nextBtnTarget.innerHTML = "Next"
  }
}
