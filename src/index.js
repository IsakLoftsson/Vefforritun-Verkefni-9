import { empty } from './lib/elements.js';
import { renderDetails, renderFrontpage, searchAndRender } from './lib/ui.js';

/**
 * Fall sem keyrir við leit.
 * @param {SubmitEvent} e
 * @returns {Promise<void>}
 */
async function onSearch(e) {
  e.preventDefault();
  console.log('onSearch, e:', e);

  if (!e.target) {
    return;
  }
  const query = e.target.querySelector('input').value;
  console.log('query:', query);

  searchAndRender(document.body, e.target, query);

  // refreshar browser??
  //window.location.search = query;

}

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 * Ef `id` er gefið er stakt geimskot birt, annars er forsíða birt með
 * leitarniðurstöðum ef `query` er gefið.
 */
function route() {
  const { search } = window.location;
  const qs = new URLSearchParams(search);

  const id = qs.get('id');
  const query = qs.get('query') ?? undefined;
  console.log('id:', id, 'query:', query);

  const parentElement = document.body;
  console.log('parentElement:', parentElement);

  if (id) {
    renderDetails(parentElement, id);
  } else {
    renderFrontpage(parentElement, onSearch, query);
    // hægt að gera svona líka:
    // renderFrontpage(document.querySelector('nafn á elementi í HTML'), onSearch, query);
  }
}

// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
  // route(); // ?????????????
};

// Athugum í byrjun hvað eigi að birta.
route();
