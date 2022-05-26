# Todos

## High priority

- [ ] Routing implementieren
- [ ] Store token in Cookie with SameSite=strict, secure and http-only on. 
- [ ] Update API to use cookie token
- [ ] Write tests

- [x] Welches feld soll hervorgehoben werden -> State
- [x] REPLACE Drone TABLE WITH v-for
- [x] refactor all buttons so color can be passed as attribute
- [x] Find solution for storing token -> Cookie with correct attributes

### Token in Cookie

- [ ] Implement Cookie auth in REST API
- [ ] Implement `Set-Cookie token=token; SameSite=Strict; HttpOnly; Secure` in login Api
- [ ] Write new function in API: `GET /users/{user}` to request all unsensitive userdata like scopes, expiration etc.
- [ ] Expiration only in jwt or also as cookie value
- [ ] Move expiration date to some global constant
- [ ] Implement cookie auth in all the other functions


### Filter System

- [ ] Vielleicht filter implementieren (nach site, updated befor etc.)
- [ ] Drone nach uuid suchen filtern ()
- [ ] Dropdown mit allen dronen per ajax ziehen

## Medium priority

- [ ] power off button : shut down drone
- [ ] Maybe remove all the request headers if unnecessary
- [ ] Edit button: Update hook to api
- [ ] In rest api eine refresh token methode einbauen (refresh token in jwt-claim) -> lease time reduzieren 
- [ ] Ability to shut down drones
- [ ] Add version system (0.x.y) x for major changes like filter, y for changes like styling 
- [ ] Better "server not responding handling". Currently just halts and only throws error when reloading page.
- [ ] Enable log out and login with different user
- [ ] Enable Registering a new user
- [ ] Add revoke api for revoking token
- [ ] Implement tooltips about machine type for example with fetching
- [ ] Find better solution than cookie
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

- [ ] Move ToDo list into Readme
