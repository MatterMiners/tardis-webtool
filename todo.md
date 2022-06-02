# Todos

## High priority

- [ ] Routing implementieren
- [ ] Write tests

- [x] Update API to use cookie token. (Almost done but usable as is. Only csrf tokens missing)
- [x] Store token in Cookie with SameSite=strict, secure and http-only on.
- [x] Welches feld soll hervorgehoben werden -> State
- [x] REPLACE Drone TABLE WITH v-for
- [x] refactor all buttons so color can be passed as attribute
- [x] Find solution for storing token -> Cookie with correct attributes

### Token in Cookie

- [x] Implement Cookie auth in REST API
- [x] Implement `Set-Cookie token=token; SameSite=Strict; HttpOnly; Secure` in login Api
- [x] Write new function in API: `GET /users/{user}` to request all unsensitive userdata like scopes, expiration etc. (Was implemented as /user/me)
- [x] Expiration only in jwt or also as cookie value
- [x] Move expiration date to some global constant. (Kind of -> new lib sets exp automatically to 15 min)
- [x] Implement cookie auth in all the other functions
- [x] Reimplement authorization with scopes in API
- [ ] Set the csrf_token_cookie recieved by the API in some local hidden div or something.
- [ ] Reenable csrf tokens in API
- [ ] Enable secure cookies in API in production


### Filter System

- [ ] Filter implementieren (nach site, updated befor etc.)
- [ ] Drone nach uuid suchen filtern ()
- [ ] Dropdown mit allen dronen per ajax ziehen

## Medium priority

- [ ] power off button : shut down drone
- [ ] Maybe remove all the request headers if unnecessary
- [ ] Edit button: Update hook to api
- [ ] Ability to shut down drones
- [ ] Add version system (0.x.y) x for major changes like filter, y for changes like styling 
- [ ] Better "server not responding handling". Currently just halts and only throws error when reloading page.
- [ ] Enable log out and login with different user
- [ ] Enable Registering a new user
- [ ] Implement tooltips about machine type for example with fetching
- [ ] Implement automatic token refresh in frontend
- [ ] Implement login with scopes sometime in the future. Scopes as dropdown
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

## Low priority

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
