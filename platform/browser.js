'use strict';"use strict";
var browser_common_1 = require('angular2/src/platform/browser_common');
exports.BROWSER_PROVIDERS = browser_common_1.BROWSER_PROVIDERS;
exports.CACHED_TEMPLATE_PROVIDER = browser_common_1.CACHED_TEMPLATE_PROVIDER;
exports.ELEMENT_PROBE_PROVIDERS = browser_common_1.ELEMENT_PROBE_PROVIDERS;
exports.ELEMENT_PROBE_PROVIDERS_PROD_MODE = browser_common_1.ELEMENT_PROBE_PROVIDERS_PROD_MODE;
exports.inspectNativeElement = browser_common_1.inspectNativeElement;
exports.BrowserDomAdapter = browser_common_1.BrowserDomAdapter;
exports.By = browser_common_1.By;
exports.Title = browser_common_1.Title;
exports.DOCUMENT = browser_common_1.DOCUMENT;
exports.enableDebugTools = browser_common_1.enableDebugTools;
exports.disableDebugTools = browser_common_1.disableDebugTools;
var lang_1 = require('angular2/src/facade/lang');
var browser_common_2 = require('angular2/src/platform/browser_common');
var compiler_1 = require('angular2/compiler');
var core_1 = require('angular2/core');
var reflection_capabilities_1 = require('angular2/src/core/reflection/reflection_capabilities');
var xhr_impl_1 = require("angular2/src/platform/browser/xhr_impl");
var compiler_2 = require('angular2/compiler');
var di_1 = require('angular2/src/core/di');
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component.
 */
exports.BROWSER_APP_PROVIDERS = lang_1.CONST_EXPR([
    browser_common_2.BROWSER_APP_COMMON_PROVIDERS,
    compiler_1.COMPILER_PROVIDERS,
    new di_1.Provider(compiler_2.XHR, { useClass: xhr_impl_1.XHRImpl }),
]);
function browserPlatform() {
    if (lang_1.isBlank(core_1.getPlatform())) {
        core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(browser_common_2.BROWSER_PROVIDERS));
    }
    return core_1.assertPlatform(browser_common_2.BROWSER_PLATFORM_MARKER);
}
exports.browserPlatform = browserPlatform;
/**
 * Bootstrapping for Angular applications.
 *
 * You instantiate an Angular application by explicitly specifying a component to use
 * as the root component for your application via the `bootstrap()` method.
 *
 * ## Simple Example
 *
 * Assuming this `index.html`:
 *
 * ```html
 * <html>
 *   <!-- load Angular script tags here. -->
 *   <body>
 *     <my-app>loading...</my-app>
 *   </body>
 * </html>
 * ```
 *
 * An application is bootstrapped inside an existing browser DOM, typically `index.html`.
 * Unlike Angular 1, Angular 2 does not compile/process providers in `index.html`. This is
 * mainly for security reasons, as well as architectural changes in Angular 2. This means
 * that `index.html` can safely be processed using server-side technologies such as
 * providers. Bindings can thus use double-curly `{{ syntax }}` without collision from
 * Angular 2 component double-curly `{{ syntax }}`.
 *
 * We can use this script code:
 *
 * {@example core/ts/bootstrap/bootstrap.ts region='bootstrap'}
 *
 * When the app developer invokes `bootstrap()` with the root component `MyApp` as its
 * argument, Angular performs the following tasks:
 *
 *  1. It uses the component's `selector` property to locate the DOM element which needs
 *     to be upgraded into the angular component.
 *  2. It creates a new child injector (from the platform injector). Optionally, you can
 *     also override the injector configuration for an app by invoking `bootstrap` with the
 *     `componentInjectableBindings` argument.
 *  3. It creates a new `Zone` and connects it to the angular application's change detection
 *     domain instance.
 *  4. It creates an emulated or shadow DOM on the selected component's host element and loads the
 *     template into it.
 *  5. It instantiates the specified component.
 *  6. Finally, Angular performs change detection to apply the initial data providers for the
 *     application.
 *
 *
 * ## Bootstrapping Multiple Applications
 *
 * When working within a browser window, there are many singleton resources: cookies, title,
 * location, and others. Angular services that represent these resources must likewise be
 * shared across all Angular applications that occupy the same browser window. For this
 * reason, Angular creates exactly one global platform object which stores all shared
 * services, and each angular application injector has the platform injector as its parent.
 *
 * Each application has its own private injector as well. When there are multiple
 * applications on a page, Angular treats each application injector's services as private
 * to that application.
 *
 * ## API
 *
 * - `appComponentType`: The root component which should act as the application. This is
 *   a reference to a `Type` which is annotated with `@Component(...)`.
 * - `customProviders`: An additional set of providers that can be added to the
 *   app injector to override default injection behavior.
 *
 * Returns a `Promise` of {@link ComponentRef}.
 */
function bootstrap(appComponentType, customProviders) {
    core_1.reflector.reflectionCapabilities = new reflection_capabilities_1.ReflectionCapabilities();
    var appInjector = core_1.ReflectiveInjector.resolveAndCreate([exports.BROWSER_APP_PROVIDERS, lang_1.isPresent(customProviders) ? customProviders : []], browserPlatform().injector);
    return core_1.coreLoadAndBootstrap(appInjector, appComponentType);
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUlBza0JiaDEudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLCtCQVlPLHNDQUFzQyxDQUFDO0FBWDVDLCtEQUFpQjtBQUNqQiw2RUFBd0I7QUFDeEIsMkVBQXVCO0FBQ3ZCLCtGQUFpQztBQUNqQyxxRUFBb0I7QUFDcEIsK0RBQWlCO0FBQ2pCLGlDQUFFO0FBQ0YsdUNBQUs7QUFDTCw2Q0FBUTtBQUNSLDZEQUFnQjtBQUNoQiwrREFDNEM7QUFFOUMscUJBQW1ELDBCQUEwQixDQUFDLENBQUE7QUFDOUUsK0JBSU8sc0NBQXNDLENBQUMsQ0FBQTtBQUM5Qyx5QkFBaUMsbUJBQW1CLENBQUMsQ0FBQTtBQUNyRCxxQkFVTyxlQUFlLENBQUMsQ0FBQTtBQUN2Qix3Q0FBcUMsc0RBQXNELENBQUMsQ0FBQTtBQUM1Rix5QkFBc0Isd0NBQXdDLENBQUMsQ0FBQTtBQUMvRCx5QkFBa0IsbUJBQW1CLENBQUMsQ0FBQTtBQUN0QyxtQkFBdUIsc0JBQXNCLENBQUMsQ0FBQTtBQUU5Qzs7R0FFRztBQUNVLDZCQUFxQixHQUEyQyxpQkFBVSxDQUFDO0lBQ3RGLDZDQUE0QjtJQUM1Qiw2QkFBa0I7SUFDbEIsSUFBSSxhQUFRLENBQUMsY0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLGtCQUFPLEVBQUMsQ0FBQztDQUN2QyxDQUFDLENBQUM7QUFFSDtJQUNFLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxrQkFBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IscUJBQWMsQ0FBQyx5QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxrQ0FBaUIsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNELE1BQU0sQ0FBQyxxQkFBYyxDQUFDLHdDQUF1QixDQUFDLENBQUM7QUFDakQsQ0FBQztBQUxlLHVCQUFlLGtCQUs5QixDQUFBO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRUc7QUFDSCxtQkFDSSxnQkFBc0IsRUFDdEIsZUFBd0Q7SUFDMUQsZ0JBQVMsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLGdEQUFzQixFQUFFLENBQUM7SUFDaEUsSUFBSSxXQUFXLEdBQUcseUJBQWtCLENBQUMsZ0JBQWdCLENBQ2pELENBQUMsNkJBQXFCLEVBQUUsZ0JBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxlQUFlLEdBQUcsRUFBRSxDQUFDLEVBQzFFLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sQ0FBQywyQkFBb0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBUmUsaUJBQVMsWUFReEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2FuZ3VsYXJfZW50cnlwb2ludCc7XG5leHBvcnQge1xuICBCUk9XU0VSX1BST1ZJREVSUyxcbiAgQ0FDSEVEX1RFTVBMQVRFX1BST1ZJREVSLFxuICBFTEVNRU5UX1BST0JFX1BST1ZJREVSUyxcbiAgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNfUFJPRF9NT0RFLFxuICBpbnNwZWN0TmF0aXZlRWxlbWVudCxcbiAgQnJvd3NlckRvbUFkYXB0ZXIsXG4gIEJ5LFxuICBUaXRsZSxcbiAgRE9DVU1FTlQsXG4gIGVuYWJsZURlYnVnVG9vbHMsXG4gIGRpc2FibGVEZWJ1Z1Rvb2xzXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbic7XG5cbmltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBpc0JsYW5rLCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtcbiAgQlJPV1NFUl9QUk9WSURFUlMsXG4gIEJST1dTRVJfQVBQX0NPTU1PTl9QUk9WSURFUlMsXG4gIEJST1dTRVJfUExBVEZPUk1fTUFSS0VSXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbic7XG5pbXBvcnQge0NPTVBJTEVSX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvY29tcGlsZXInO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBjb3JlTG9hZEFuZEJvb3RzdHJhcCxcbiAgcmVmbGVjdG9yLFxuICBSZWZsZWN0aXZlSW5qZWN0b3IsXG4gIFBsYXRmb3JtUmVmLFxuICBPcGFxdWVUb2tlbixcbiAgZ2V0UGxhdGZvcm0sXG4gIGNyZWF0ZVBsYXRmb3JtLFxuICBhc3NlcnRQbGF0Zm9ybVxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7UmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5pbXBvcnQge1hIUkltcGx9IGZyb20gXCJhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci94aHJfaW1wbFwiO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxuLyoqXG4gKiBBbiBhcnJheSBvZiBwcm92aWRlcnMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIGludG8gYGFwcGxpY2F0aW9uKClgIHdoZW4gYm9vdHN0cmFwcGluZyBhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfQVBQX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUyxcbiAgQ09NUElMRVJfUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUkltcGx9KSxcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclBsYXRmb3JtKCk6IFBsYXRmb3JtUmVmIHtcbiAgaWYgKGlzQmxhbmsoZ2V0UGxhdGZvcm0oKSkpIHtcbiAgICBjcmVhdGVQbGF0Zm9ybShSZWZsZWN0aXZlSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShCUk9XU0VSX1BST1ZJREVSUykpO1xuICB9XG4gIHJldHVybiBhc3NlcnRQbGF0Zm9ybShCUk9XU0VSX1BMQVRGT1JNX01BUktFUik7XG59XG5cbi8qKlxuICogQm9vdHN0cmFwcGluZyBmb3IgQW5ndWxhciBhcHBsaWNhdGlvbnMuXG4gKlxuICogWW91IGluc3RhbnRpYXRlIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gYnkgZXhwbGljaXRseSBzcGVjaWZ5aW5nIGEgY29tcG9uZW50IHRvIHVzZVxuICogYXMgdGhlIHJvb3QgY29tcG9uZW50IGZvciB5b3VyIGFwcGxpY2F0aW9uIHZpYSB0aGUgYGJvb3RzdHJhcCgpYCBtZXRob2QuXG4gKlxuICogIyMgU2ltcGxlIEV4YW1wbGVcbiAqXG4gKiBBc3N1bWluZyB0aGlzIGBpbmRleC5odG1sYDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8aHRtbD5cbiAqICAgPCEtLSBsb2FkIEFuZ3VsYXIgc2NyaXB0IHRhZ3MgaGVyZS4gLS0+XG4gKiAgIDxib2R5PlxuICogICAgIDxteS1hcHA+bG9hZGluZy4uLjwvbXktYXBwPlxuICogICA8L2JvZHk+XG4gKiA8L2h0bWw+XG4gKiBgYGBcbiAqXG4gKiBBbiBhcHBsaWNhdGlvbiBpcyBib290c3RyYXBwZWQgaW5zaWRlIGFuIGV4aXN0aW5nIGJyb3dzZXIgRE9NLCB0eXBpY2FsbHkgYGluZGV4Lmh0bWxgLlxuICogVW5saWtlIEFuZ3VsYXIgMSwgQW5ndWxhciAyIGRvZXMgbm90IGNvbXBpbGUvcHJvY2VzcyBwcm92aWRlcnMgaW4gYGluZGV4Lmh0bWxgLiBUaGlzIGlzXG4gKiBtYWlubHkgZm9yIHNlY3VyaXR5IHJlYXNvbnMsIGFzIHdlbGwgYXMgYXJjaGl0ZWN0dXJhbCBjaGFuZ2VzIGluIEFuZ3VsYXIgMi4gVGhpcyBtZWFuc1xuICogdGhhdCBgaW5kZXguaHRtbGAgY2FuIHNhZmVseSBiZSBwcm9jZXNzZWQgdXNpbmcgc2VydmVyLXNpZGUgdGVjaG5vbG9naWVzIHN1Y2ggYXNcbiAqIHByb3ZpZGVycy4gQmluZGluZ3MgY2FuIHRodXMgdXNlIGRvdWJsZS1jdXJseSBge3sgc3ludGF4IH19YCB3aXRob3V0IGNvbGxpc2lvbiBmcm9tXG4gKiBBbmd1bGFyIDIgY29tcG9uZW50IGRvdWJsZS1jdXJseSBge3sgc3ludGF4IH19YC5cbiAqXG4gKiBXZSBjYW4gdXNlIHRoaXMgc2NyaXB0IGNvZGU6XG4gKlxuICoge0BleGFtcGxlIGNvcmUvdHMvYm9vdHN0cmFwL2Jvb3RzdHJhcC50cyByZWdpb249J2Jvb3RzdHJhcCd9XG4gKlxuICogV2hlbiB0aGUgYXBwIGRldmVsb3BlciBpbnZva2VzIGBib290c3RyYXAoKWAgd2l0aCB0aGUgcm9vdCBjb21wb25lbnQgYE15QXBwYCBhcyBpdHNcbiAqIGFyZ3VtZW50LCBBbmd1bGFyIHBlcmZvcm1zIHRoZSBmb2xsb3dpbmcgdGFza3M6XG4gKlxuICogIDEuIEl0IHVzZXMgdGhlIGNvbXBvbmVudCdzIGBzZWxlY3RvcmAgcHJvcGVydHkgdG8gbG9jYXRlIHRoZSBET00gZWxlbWVudCB3aGljaCBuZWVkc1xuICogICAgIHRvIGJlIHVwZ3JhZGVkIGludG8gdGhlIGFuZ3VsYXIgY29tcG9uZW50LlxuICogIDIuIEl0IGNyZWF0ZXMgYSBuZXcgY2hpbGQgaW5qZWN0b3IgKGZyb20gdGhlIHBsYXRmb3JtIGluamVjdG9yKS4gT3B0aW9uYWxseSwgeW91IGNhblxuICogICAgIGFsc28gb3ZlcnJpZGUgdGhlIGluamVjdG9yIGNvbmZpZ3VyYXRpb24gZm9yIGFuIGFwcCBieSBpbnZva2luZyBgYm9vdHN0cmFwYCB3aXRoIHRoZVxuICogICAgIGBjb21wb25lbnRJbmplY3RhYmxlQmluZGluZ3NgIGFyZ3VtZW50LlxuICogIDMuIEl0IGNyZWF0ZXMgYSBuZXcgYFpvbmVgIGFuZCBjb25uZWN0cyBpdCB0byB0aGUgYW5ndWxhciBhcHBsaWNhdGlvbidzIGNoYW5nZSBkZXRlY3Rpb25cbiAqICAgICBkb21haW4gaW5zdGFuY2UuXG4gKiAgNC4gSXQgY3JlYXRlcyBhbiBlbXVsYXRlZCBvciBzaGFkb3cgRE9NIG9uIHRoZSBzZWxlY3RlZCBjb21wb25lbnQncyBob3N0IGVsZW1lbnQgYW5kIGxvYWRzIHRoZVxuICogICAgIHRlbXBsYXRlIGludG8gaXQuXG4gKiAgNS4gSXQgaW5zdGFudGlhdGVzIHRoZSBzcGVjaWZpZWQgY29tcG9uZW50LlxuICogIDYuIEZpbmFsbHksIEFuZ3VsYXIgcGVyZm9ybXMgY2hhbmdlIGRldGVjdGlvbiB0byBhcHBseSB0aGUgaW5pdGlhbCBkYXRhIHByb3ZpZGVycyBmb3IgdGhlXG4gKiAgICAgYXBwbGljYXRpb24uXG4gKlxuICpcbiAqICMjIEJvb3RzdHJhcHBpbmcgTXVsdGlwbGUgQXBwbGljYXRpb25zXG4gKlxuICogV2hlbiB3b3JraW5nIHdpdGhpbiBhIGJyb3dzZXIgd2luZG93LCB0aGVyZSBhcmUgbWFueSBzaW5nbGV0b24gcmVzb3VyY2VzOiBjb29raWVzLCB0aXRsZSxcbiAqIGxvY2F0aW9uLCBhbmQgb3RoZXJzLiBBbmd1bGFyIHNlcnZpY2VzIHRoYXQgcmVwcmVzZW50IHRoZXNlIHJlc291cmNlcyBtdXN0IGxpa2V3aXNlIGJlXG4gKiBzaGFyZWQgYWNyb3NzIGFsbCBBbmd1bGFyIGFwcGxpY2F0aW9ucyB0aGF0IG9jY3VweSB0aGUgc2FtZSBicm93c2VyIHdpbmRvdy4gRm9yIHRoaXNcbiAqIHJlYXNvbiwgQW5ndWxhciBjcmVhdGVzIGV4YWN0bHkgb25lIGdsb2JhbCBwbGF0Zm9ybSBvYmplY3Qgd2hpY2ggc3RvcmVzIGFsbCBzaGFyZWRcbiAqIHNlcnZpY2VzLCBhbmQgZWFjaCBhbmd1bGFyIGFwcGxpY2F0aW9uIGluamVjdG9yIGhhcyB0aGUgcGxhdGZvcm0gaW5qZWN0b3IgYXMgaXRzIHBhcmVudC5cbiAqXG4gKiBFYWNoIGFwcGxpY2F0aW9uIGhhcyBpdHMgb3duIHByaXZhdGUgaW5qZWN0b3IgYXMgd2VsbC4gV2hlbiB0aGVyZSBhcmUgbXVsdGlwbGVcbiAqIGFwcGxpY2F0aW9ucyBvbiBhIHBhZ2UsIEFuZ3VsYXIgdHJlYXRzIGVhY2ggYXBwbGljYXRpb24gaW5qZWN0b3IncyBzZXJ2aWNlcyBhcyBwcml2YXRlXG4gKiB0byB0aGF0IGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIEFQSVxuICpcbiAqIC0gYGFwcENvbXBvbmVudFR5cGVgOiBUaGUgcm9vdCBjb21wb25lbnQgd2hpY2ggc2hvdWxkIGFjdCBhcyB0aGUgYXBwbGljYXRpb24uIFRoaXMgaXNcbiAqICAgYSByZWZlcmVuY2UgdG8gYSBgVHlwZWAgd2hpY2ggaXMgYW5ub3RhdGVkIHdpdGggYEBDb21wb25lbnQoLi4uKWAuXG4gKiAtIGBjdXN0b21Qcm92aWRlcnNgOiBBbiBhZGRpdGlvbmFsIHNldCBvZiBwcm92aWRlcnMgdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlXG4gKiAgIGFwcCBpbmplY3RvciB0byBvdmVycmlkZSBkZWZhdWx0IGluamVjdGlvbiBiZWhhdmlvci5cbiAqXG4gKiBSZXR1cm5zIGEgYFByb21pc2VgIG9mIHtAbGluayBDb21wb25lbnRSZWZ9LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwKFxuICAgIGFwcENvbXBvbmVudFR5cGU6IFR5cGUsXG4gICAgY3VzdG9tUHJvdmlkZXJzPzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4pOiBQcm9taXNlPENvbXBvbmVudFJlZj4ge1xuICByZWZsZWN0b3IucmVmbGVjdGlvbkNhcGFiaWxpdGllcyA9IG5ldyBSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKCk7XG4gIHZhciBhcHBJbmplY3RvciA9IFJlZmxlY3RpdmVJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFxuICAgICAgW0JST1dTRVJfQVBQX1BST1ZJREVSUywgaXNQcmVzZW50KGN1c3RvbVByb3ZpZGVycykgPyBjdXN0b21Qcm92aWRlcnMgOiBbXV0sXG4gICAgICBicm93c2VyUGxhdGZvcm0oKS5pbmplY3Rvcik7XG4gIHJldHVybiBjb3JlTG9hZEFuZEJvb3RzdHJhcChhcHBJbmplY3RvciwgYXBwQ29tcG9uZW50VHlwZSk7XG59XG4iXX0=