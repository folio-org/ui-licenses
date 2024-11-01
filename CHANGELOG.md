# Change history for ui-licenses

## 11.2.0 IN PROGRESS

## 11.1.0 2024-11-01
  * ERM-3379 Update module license and guidance for ui-licenses
  * ERM-3353 Review and cleanup Module Descriptor for ui-licenses
  * ERM-3298 Block save on invalid date in license edit
  * ERM-3233 React v19: refactor ui-licenses away from default props for functional components
  * ERM-3165 Replace moment with dayjs across app suite
  * FOLIO-4086 Fix GitHub Actions workflow not running for tags

## 11.0.2 2024-07-05
  * ERM-3285 Fix permission on /licenses/files/{id}/raw in mod-licenses

## 11.0.1 2024-04-19
  * ERM-3182 Scrolling content in license view pane can overlap header
  * Translations

## 11.0.0 2024-03-22
* ERM-3129 Remove explicit typescript version
* ERM-3119 Add Organisation status to organisation card display
* ERM-3062 Add has/has not filter in Licenses and amendments
* ERM-3059 Filter for supplementary documents in License amendments
* ERM-3058 Filter for supplementary documents in Licenses
* ERM-3057 Filter for core documents in License amendments
* ERM-3056 Filter for core documents in Licenses
* ERM-2057 Licenses and Amendments - Implement MCL Next/Previous pagination
* ERM-1910 Swap Licenses Pick lists settings screen to single 4 pane based layout
* *BREAKING* Switched to licenses interface 6

## 10.0.0 2023-10-13
* ERM-3037 unlock @rehooks/local-storage from 2.4.4
* ERM-3029 *BREAKING* bump `react-intl` to `v6.4.4`
* ERM-3019 Remove `license=owner.id` in Amendments search params
* ERM-3001 Update Node.js to v18 in GitHub Actions
* ERM-2993 Add amendments search in licenses app
* ERM-2973 Replace naive fetch hooks with parallelised ones (and deprecate)
  * ERM-2976 Switch to useParallelBatchFetch
  * ERM-2977 Switch to useChunkedUsers
* ERM-2903 License form is incorrectly initialized if refdata lacks type=local and status=active
* ERM-2625 Add view only permissions for License settings
* ERM-2641 Upgrade to Grails 5 (including Hibernate 5.6.x) for Poppy
  * Added okapi interface dependency on new licenses interface 5.0
* ERM-2189 Display the amendment count badge on a license when the Amendments accordion is expanded
* STRIPES-870 *BREAKING* upgrade react to v18
  * ERM-2990 Upgrade ui-licenses React to v18

## 9.0.0 2023-02-22
* ERM-2565 Increment ui-licenses to Stripes v8
* ERM-2533 Refactor interfaces code to react-query
* ERM-2487 Refactor licenses routes
* ERM-2467 Change export file name and file extension in Agreements and Local KB admin
* ERM-2455 Bump ui-licenses erm-components dep
* ERM-2434 "customProperties.ctx.title": "" in en.json
* ERM-2420 Amendment doesn't show licensor value of parent license
* ERM-2414 Missing translation values in license settings
* ERM-2398 LicenseFilters should not be rendered within <form> intended for search field
* ERM-2294 Remove BigTest/Nightmare dependencies and tests (ui-licenses)
* FAT-82 ui-licenses: UI tests replacement with RTL/Jest
  * ERM-2276 Add test coverage for ui-licenses settings <LicensesCustomProperties>
  * ERM-2272 Add test coverage for ui-licenses routes <EditLicenseRoute>
  * ERM-2261 Add test coverage for ui-licenses viewSections <AmendmentLicense>
  * ERM-2258 Add test coverage for ui-licenses <LicenseLookup>


## 8.3.0 2022-10-26
* ERM-2386 Show a user-friendly message when deleting a pick list with 0 values which is assigned to a License Term
* ERM-2379 @folio/stripes-testing is incorrectly listed as a direct dependency
* ERM-2371 In custom property Type dropdown Refdata and Refdata (multi-select) should be labelled "Pick list" and "Pick list (multi-select)"
* ERM-2366 Core documents for a License shouldn't display a category
* ERM-2321 stripes-erm-components should be a peer
* ERM-2316 Update for stripes-kint-components translation handling changes
* ERM-2283 Upgrade Users interface to 16.0
* ERM-2279 Refactor ui-plugin-find-license to react-query
* ERM-2216 Migrate ui-licenses Picklist Settings
* ERM-2173 New / Edit supplementary property and Term modals: UX improvements (Settings app)
* ERM-2157 Add multi-select support for custom properties
* FAT-82 ui-licenses: UI tests replacement with RTL/Jest
  * ERM-2275 Add test coverage for ui-licenses routes <NoteEditRoute>
  * ERM-2274 Add test coverage for ui-licenses routes <NoteCreateRoute>
  * ERM-2273 Add test coverage for ui-licenses routes <LicensesRoute>
  * ERM-2271 Add test coverage for ui-licenses routes <EditAmendmentRoute>
  * ERM-2270 Add test coverage for ui-licenses routes <CreateLicenseRoute>
  * ERM-2269 Add test coverage for ui-licenses viewSections <SupplementaryDocs>
  * ERM-2268 Add test coverage for ui-licenses viewSections <LicenseOrganizations>
  * ERM-2267 Add test coverage for ui-licenses viewSections <LicenseInternalContacts>
  * ERM-2266 Add test coverage for ui-licenses viewSections <LicenseInfo>
  * ERM-2265 Add test coverage for ui-licenses viewSections <LicenseHeader>
  * ERM-2264 Add test coverage for ui-licenses viewSections <LicenseAmendments>
  * ERM-2263 Add test coverage for ui-licenses viewSections <LicenseAgreements>
  * ERM-2262 Add test coverage for ui-licenses viewSections <CoreDocs>
  * ERM-2260 Add test coverage for ui-licenses viewSections <AmendmentInfo>
  * ERM-2257 Add test coverage for ui-licenses <Licenses>
  * ERM-2256 Add test coverage for ui-licenses <LicenseFilters>
  * ERM-2255 Add test coverage for ui-licenses <License>
  * ERM-2254 Add test coverage for ui-licenses <ExportLicenseAsCSVModal>
  * ERM-2253 Add test coverage for ui-licenses <DuplicateLicenseModal>
  * ERM-2252 Add test coverage for ui-licenses <DuplicateAmendmentModal>
  * ERM-2251 Add test coverage for ui-licenses <AmendmentForm>
* Bump to stripes-erm-components ^7.0.0

## 8.2.2 2022-07-29
* ERM-2297 Number of tags doesn't update on adding tags to agreement or agreement line
* ERM-2282 Toast message fails to display to user

## 8.2.1 2022-07-04
* ERM-2225 Amendment/License link status values do not update immediately after Agreement edit
* ERM-2224 Error on duplicating amendment
* ERM-2217 In custom property Type dropdown Refdata and Refdata (multi-select) should be labelled "Pick list" and "Pick list (multi-select)"
* ERM-2204 Toast error message not displayed on failure to delete custom property
* ERM-2175 Migrate Edit/Create routes to react-query where we have regressions
* ERM-2159 Bump frontend dependency on stripes-kint-components
* ERM-2148 update outdated dependencies in ui-licenses
* ERM-2109 Refactor away from react-intl-safe-html (ui-licenses)
* ERM-2099 Replace babel-eslint with @babel/eslint-parser
* ERM-2072 A maximum of 10 custom properties are retrieved for agreements and licenses
* ERM-2068 Add support for Date across License filters
* ERM-2066 Number of tags doesn't update on adding tags to agreement line (Refactor to react-query from stripes-connect)
* ERM-2044 Ability to make custom properties deprecated
* ERM-2043 Implement updated design for term management in license settings
* ERM-1971 Bump eslint-config stripes version
* ERM-778 Add Date type to customProperties
* FAT-82 ui-licenses: UI tests replacement with RTL/Jest
  * ERM-1510 TermsConfigForm
  * ERM-1509 TermsConfigRoute
  * ERM-1507 PickListSettings


## 8.1.0 2022-03-03
* ERM-1982 Licenses: Organization interface credentials malfunction
* ERM-1945 Add AppSettings panel to Licenses
* ERM-1898 Upgrade `@folio/react-intl-safe-html` for compatibility with `@folio/stripes` `v7`.
* ERM-1758 Licenses: Apply keyboard shortcuts modal guidelines
* ERM-1745 Add Organisations to Licenses simple search widget definition
* ERM-1628 Expand emptyAccordion.* {type} for correct translations
* FAT-82
  * ERM-1508 PickListValueSettings
  * ERM-1506 withFileHandlers
  * ERM-1505 ViewLicenseRoute
  * ERM-1504 ViewAmendmentRoute
  * ERM-1503 NoteViewRoute
  * ERM-1496 CreateAmendmentRoute
  * ERM-1344 formSections
    * ERM-1454 LicenseFormOrganizations
    * ERM-1453 LicenseFormInternalContacts
    * ERM-1452 LicenseFormInfo
    * ERM-1451 FormTerms
    * ERM-1450 FormSupplementaryDocs
    * ERM-1449 FormCoreDocs
    * ERM-1448 AmendmentFormInfo
  * ERM-1301 NoPermissions
  * ERM-1300 LicenseForm
  * ERM-1293 Amendment


## 8.0.0 2021-10-07
* Fixed bug with error on saving license if a change is made to the visibility (internal) flag of a primary property without populating it. ERM-1770
* UX improvements for the Edit record pane title. ERM-1854
* Upgrade to Stripes 7.0
* Display emoty accordion cell when startDate is not set. ERM-1787
* Displays list of other amendments on the parent license. ERM-1786
* Included interface dependency for licenses 4.0

## 6.1.1 2021-07-30
* Fixed bug with Incorrect "status in agreement" displaying for a license when there are multiple licenses for a single agreement. ERM-1767
## 6.1.0 2021-06-16
* ERM-1683 Set up ui-licenses Registry entry
* ERM-1640 Lock ui-licenses to @rehooks/local-storage 2.4.0
* ERM-1620 Actions menu doesn't display for Licenses even when there are valid actions for the user
* ERM-1608 Add count of populated terms in accordion header
* ERM-1594 Add descriptions to visible permission set in ui-licenses

## 6.0.0 2021-03-17
* Upgrade to Stripes 6.0
* Added optionalOkapiInterfaces to package.json. ERM-940
* Removed edit button in license detail view, moved "New" option in "Actions" dropdown, added icons. ERM-1149
* Removed edit button in amendment detail view. ERM-1149
* Improvements to the Amendment preview pane presentation ERM-1176
* On Platform view Action button should not show if user would see no options in Action dropdown ERM-1225
* Duplicate amendment ability added ERM-1229
* Added keyboard shortcuts for licenses. ERM-1239
* Support searching on License start and end date ERM-1251
* Refactored LicenseFilters to functional component. ERM-1532
* Added keyboard shortcuts for amendments. ERM-1538
* Update stripes-cli to v2. ERM-1550
* Remove dependency on order-lines interface ERM-1552
* When displaying Interfaces for an organisation in a License full details are only retrieved for 10 ERM-1560
* Added conditional rendering of accordions in license and amendment view. ERM-1581
## 5.0.1 2020-11-05
* Fixes bug where incorrect Dates are saved when tenant timezone is ahead of UTC. ERM-1202
* Fixes bug where a user with manage license terms permission should be able to edit the license terms. ERM-1196
* Bumped the limit to fetch 100 results for user definable pick lists. ERM-1193

##  5.0.0 2020-10-15
* Added ability to set and view notes on organizations. ERM-967
* Retrieve upto 100 results from users endpoint. ERM-980
* Upgrade to Stripes 5.0
* Separate organization and role filter. ERM-1043
* Added ability to search agreement by its description. ERM-1044
* Remove unused redux dependencies.
* Refactor `bigtest/mirage` with `miragejs`.

## 4.0.1 2020-07-06
* Fixed issue with only 10 results being retrieved for internal contacts. ERM-980

## 4.0.0 2020-06-11
* Added permission set and ability to delete licenses. ERM-748
* Show/hide pick list actions based on refdata category type. ERM-735
* Added ability to duplicate a license. ERM-814
* Added support for "Alternative names" for licenses. refs ERM-828
* Moved ability to filter licenses by their terms to stripes-erm-components. ERM-876
* Bumped the required node version to 10.

## 3.7.2 2020-03-27
* Fixed filtering licenses by tag. ERM-810

## 3.7.1 2020-03-12
* Fixed internal contacts accordion label.

## 3.7.0 2020-03-11
* Switched to using `<FormattedUTCDate>` from Stripes. ERM-635
* Switched to using `<Spinner>` from Stripes. ERM-635
* Keyboard navigation and focus improvements. ERM-593 622 628
* Hid "Delete License" permission set. ERM-615
* Added @folio/react-intl-safe-html to dependencies. ERM-539
* Added ability to filter licenses by their terms. ERM-668
* Switched to showing amendment record after it's created. ERM-454
* Added type checks for term values. ERM-645
* Added ability to export licenses. ERM-712
* Added callouts and confirmation modals. ERM-723 724 725
* Upgrade to Stripes 3.0
* Added ability to filter licenses by terms. ERM-684
* Added inactive indication to icon in Licenses list. ERM-745
* Fixed bug with resetting 'Open Ended' checkbox. ERM-770

## 3.6.0 2019-12-04
* Port ui-licenses to RFF. ERM-487.
* Update stripes to v2.10.1 to support PaneFooter.
* Move the Save & close button and add a Cancel button to Pane footer. ERM-412.
* Apply the new large headline design to Licenses. ERM-260.
* Added support for interface `licenses` version `2.0`.
* Updated permission sets. ERM-477
* Updated forms to use React Final Form instead of Redux Form

## 3.5.0 2019-09-09
* Added support for `mod-organizations-storage` 2.0
* Added settings page for License Terms. ERM-391
* Added settings page for Pick Lists. ERM-389 390
* Fixed bug where resetting query term wouldn't execute a search. ERM-426
* Show/hide interface credentials. Fixes ERM-431
* Added Tags functionality. ERM-424

## 3.4.0 2019-08-20
* Render Internal Contacts as cards. ERM-309
* Manage public notes on license term values. ERM-355

## 3.3.0 2019-07-24
* Attach Notes to licenses. ERM-269
* Use updated `Card` UI for organizations. ERM-230 280 281 282
* Block form submission when term note is set without a value. ERM-268
* Accordion UI cleanup. ERM-341 342
* Use dates instead of datetimes. ERM-294
* Only allow one organization to be a Licensor. ERM-344

## 3.2.0 2019-06-10
* Added ability to attach files to documents. ERM-257
* Added ability to manage amendments for licenses. ERM-147

## 3.1.0 2019-05-21
 * ERM-219 Support Organizations app as source of Organizations in Licenses
   * ERM-232 Front-end updates
 * ERM-212 Remove horizontal rules between filters in Agreements and License apps
 * ERM-163 View internal contacts for a license
 * ERM-162 Manage internal contacts for a license
   * ERM-180 Use generalised contacts component
   * ERM-179 Generalise agreements/contacts to shared component
 * ERM-75  Clearing the organization filter value not working as expected

## 3.0.0 2019-05-07

 * ERM-166 Remove unwanted extra license section
 * ERM-133 Configure Document Categories
 * ERM-143 Add License / Supplementaty License Information Panel UI
 * ERM-181 Fix data sync issue with GOKb (Resumption Token and Broken Coverage)
 * ERM-139 Convert from SearchAndSort to SearchAndSortQuery
 * ERM-79 Set supplementary informaiton for a license
 * ERM-173 Manage Tags on Agreements
 * ERM-174 Seach Agreements by Tag
 * ERM-194 BUGFIX: Opening edit/create license with only one page does not work

## 2.4.0 2019-04-08

 * ERM-115 Provide correct data for agreement line
 * ERM-111 Build Settings Page
 * ERM-112 Build Wrapper Component for supression
 * ERM-113 Use Wrapper Component in Agreements
 * ERM-114 Write tests
 * ERM-98 Rendering Controlling Terms License
 * ERM-127 Resources with no coverage set should not display
 * ERM-110 Agreement Detail record - View attached EBSCO eResource
 * ERM-109 Support the ability to create an agreement from eHoldings
 * ERM-108 Supress agreements app functions
 * ERM-64 Show Controlling License Terms

## 2.3.0 2019-03-22

* Added ability to view agreements linked to a license.

## 2.2.0 2019-03-04

* Added name export of Licenses search UI
* Use `LicenseCard` when rendering license header.

## 2.1.0 2019-02-12
* Added ability to view, add, edit, and remove core documents from licenses.

## 2.0.0 2019-01-18

* Upgrade to Stripes 2.0
* Removed usage of lookbehinds in regexes (avail in 2.0.1)
* Added License Status filter to search.
* Added ability to view, add, edit, and remove terms from licenses.
* Added ability to view, add, edit, and remove organizations from licenses.
* Added sticky license header.

## 1.1.0 2018-12-11

* First official release for Q4 Release

## 1.0.0
* Clone ui-erm
* Set up initial scaffolding
