# In-N-Out Pal

A phone ordering helper for In-N-Out. Pick your order in Chinese (default) or
Spanish, then show the cashier a clean English order sheet or save it as an
image. Works offline once it's on the Home Screen.

Prices are estimates for Southern California (2026) and may vary by location.

## Versions

The version is shown in the app header (e.g. `V5.0.0`) and uses
`MAJOR.MINOR.PATCH`:

- **Middle number** (`5.1.0`): bigger changes, such as new features or redesigns.
- **Last number** (`5.0.1`): small fixes, wording, price updates, tweaks.

On every release, change both:

- `APP_VERSION` in `index.html`
- `CACHE_NAME` in `service-worker.js`

Changing `CACHE_NAME` is what makes installed phones download the update. To
get it, open the app, fully close it, and open it again.
