# Todos

## High priority

- [ ] Write tests

- [x] refactor al droneFunctions from sessionStore into droneStore
- [x] Move the refreshDrones stuff from NavBar.vue to mounted() on DroneGrid
- [x] Security bug: all fetched Data remains in memory when logging out. So the next user can read from other user.
  - [x] Solution: make a global Watcher for authStore.loggedIn. Whenever it changes to false delete all Session Data.
  - [x] Save all session data in some Object.
  - [x] Was fixed: Altough not like mentioned above. See at commits to see details. In short: added persistens pinia store to store loggedIn param
- [x] Update API to use cookie token. (Almost done but usable as is. Only csrf tokens missing)
- [x] Store token in Cookie with SameSite=strict, secure and http-only on.
- [x] Welches feld soll hervorgehoben werden -> State
- [x] REPLACE Drone TABLE WITH v-for
- [x] refactor all buttons so color can be passed as attribute
- [x] Find solution for storing token -> Cookie with correct attributes

### Routing

- [ ] Use beforeResolve hook to fetch droneData before loading components dependent on droneData. Do not fetch directly after login succeeds.
- [ ] Use per-component hooks to run checks/??? before requesting /{drone_uuid}/xxx routes
- [ ] redirect to dashboard on successful login (independent of auth checking)

- [x] Introduce Filterbar as separate named view in Main.vue
- [x] Find a fitting routing method. (Vue router)
- [x] Use beforeEach to check if user is authenticated or redirect to login
- [x] Fetch filter values at the same time as droneData (but cache it somehow)
- [x] Use meta fields in routes to define authorization required 

### Filter System

- [x] Filter implementieren (nach site, updated befor etc.)
- [x] Drone nach uuid suchen filtern ()
- [x] Dropdown mit allen dronen per ajax ziehen

## Medium priority

- [ ] power off button : shut down drone
- [x] Maybe remove all the request headers if unnecessary
- [ ] Edit button: Update hook to api
- [x] Better "server not responding handling". Currently just halts and only throws error when reloading page.
- [x] Enable log out and login with different user
- [ ] Enable Registering a new user
- [ ] Implement tooltips about machine type for example with fetching
- [ ] Implement automatic token refresh in frontend
- [ ] Implement login with scopes sometime in the future. Scopes as dropdown
- [x] Make refresh button appear only when logged in
- [x] Using reactivity API to track authStore logged in state to enable/disable automatic fetch of droneData
- [x] Add user:get scopes as constants
- [x] Add Login Button
- [~] Add proper landing page
- [x] Disable logout button when not logged in
- [x] Make protected route and put everything where authentication is needed in there
- [x] NavBar shifts 1px when collapsing filter bar when using v-show instead of v-if on FilterBar
- [x] If I need a link that doesn't precede /protected I can simply use an alias
- [ ] Add tooltips over button hover
- [ ] Make global exception handler to display exceptions in NavBar
- [ ] Route back to login when receiving 401 or 403 respons
- [ ] Make login persistent when reloading site and refetch all data on each reload with a hook
- [ ] Maybe make api data dependent computed properties
- [ ] Make default Styling for h1 h2 etc.
- [ ] Disable reload and filter button if not in drone menus 
- [ ] Currently scopes are pulled as user scopes (Maybe consider changin it to token scopes )
- [ ] Make a logged in as ... widget
- [ ] Error Handling for the drone widget screen
- [ ] Automatic logout when auth missing on 403 or 404 request maybe
- [ ] Handling for 403 responses...
- [ ] Split index.css into multiple files
- [ ] Make filter bar persistent (dont delete filters on closing) 
- [x] Use commit body to go into more detail according to conventional commits
- [x] Add revoke api for revoking token (Kind of with /user/logout)
- [x] In rest api eine refresh token methode einbauen (refresh token in jwt-claim) -> lease time reduzieren.
- [x] Investigate why drone widgets stay expanded when refetching droneData => Because key was intuitively set to drone_uuid which was correct by accident.
- [x] Make urgency categories for todos
- [x] Add expand all button
- [x] Keep DroneWidgets from collapsing at change -> They never did, because :key was set correctly
- [x] Automatic periodic reload of droneData
- [x] Upper right: Yellow reload button
- [x] Update button in sidebar + automatic updates
- [x] In Mobile view können die Dronen im Grid minimiert werden
- [x] More Button
- [x] Welche drone states gibt es? -> See chat (Somewhere in the code + db)

### More Token Security

- [ ] Set the csrf_token_cookie recieved by the API in some local hidden div or something.
- [ ] Reenable csrf tokens in API
- [ ] Enable secure cookies in API in production

## Low priority

- [ ] Add version system (0.x.y) x for major changes like filter, y for changes like styling 
- [ ] Diese Liste **komplett** auf englisch updaten
- [ ] drone state reactive color
- [ ] Even More Button -> spawns different window to see even more drone details
- [ ] Drone UUID verlinken um mehr informationen zu bekommen
- [ ] Hover or click on table cell to get more info about prop -> Info Button
- [ ] Make Grid cells collapse on themselves (No gaps) -> Use ul's as columns
- [ ] footer with impressum etc...
- [ ] Multiple Tabs in side bar: Widget view (4 squares), Table view with summarization (table icon), Global settings (cog icon) 
- [ ] Maybe find better solution to "view more" Widget than fixed height
- [ ] Animate expansion of droneWidget
- [ ] Add font-awsome icon lib
- [ ] Write proper Readme
- [x] Custom 404 view

## Very low priority

- [ ] Add some color into todo

## Final Goals

- [ ] Responsive Layout
- [ ] Secure Auth
- [ ] REST Docs updaten + vervollständigen
- [ ] Thought out error handling for apis
- [ ] Type check + interface for all used api response values
- [ ] Add nginx server (or sth else) as proxy for api calls (No cors, API is called as relative path. See *Ontheflydoc*)
- [ ] reactive filter system (see filter file)
- [ ] Table view
- [ ] Handle Http errors individually

## Discarded

- [ ] Find better solution than cookie (There isn't really a better one)
- [ ] Move ToDo list into Readme

## Done

### Token in Cookie (Done)

- [x] Implement Cookie auth in REST API
- [x] Implement `Set-Cookie token=token; SameSite=Strict; HttpOnly; Secure` in login Api
- [x] Write new function in API: `GET /users/{user}` to request all unsensitive userdata like scopes, expiration etc. (Was implemented as /user/me)
- [x] Expiration only in jwt or also as cookie value
- [x] Move expiration date to some global constant. (Kind of -> new lib sets exp automatically to 15 min)
- [x] Implement cookie auth in all the other functions
- [x] Reimplement authorization with scopes in API