# In-N-Out Pal

A phone ordering helper for In-N-Out. Pick your order in Chinese (default) or
Spanish, then show the cashier a clean English order sheet or save it as an
image. Works offline once it's on the Home Screen.

Prices are estimates for Southern California (2026) and may vary by location.

Not affiliated with or endorsed by In-N-Out Burgers. "In-N-Out" and menu item
names are trademarks of their owner and are used only to describe what you're
ordering.

© 2026 David Lu · Insta@Kinryux

## Versions

The version is shown in the app header (e.g. `V5.4`) and uses
`MAJOR.MINOR`:

- **First number** (`6.0`): bigger changes, such as new features or redesigns.
- **Last number** (`5.5`): small fixes, wording, price updates, tweaks.

On every release, change both:

- `APP_VERSION` in `index.html`
- `CACHE_NAME` in `service-worker.js`

Changing `CACHE_NAME` is what makes installed phones download the update. To
get it, open the app, fully close it, and open it again.
