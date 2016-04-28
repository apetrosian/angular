'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var o = require('../output/output_ast');
var identifiers_1 = require('../identifiers');
function getPropertyInView(property, callingView, definedView) {
    if (callingView === definedView) {
        return property;
    }
    else {
        var viewProp = o.THIS_EXPR;
        var currView = callingView;
        while (currView !== definedView && lang_1.isPresent(currView.declarationElement.view)) {
            currView = currView.declarationElement.view;
            viewProp = viewProp.prop('parent');
        }
        if (currView !== definedView) {
            throw new exceptions_1.BaseException("Internal error: Could not calculate a property in a parent view: " + property);
        }
        if (property instanceof o.ReadPropExpr) {
            var readPropExpr_1 = property;
            // Note: Don't cast for members of the AppView base class...
            if (definedView.fields.some(function (field) { return field.name == readPropExpr_1.name; }) ||
                definedView.getters.some(function (field) { return field.name == readPropExpr_1.name; })) {
                viewProp = viewProp.cast(definedView.classType);
            }
        }
        return o.replaceVarInExpression(o.THIS_EXPR.name, viewProp, property);
    }
}
exports.getPropertyInView = getPropertyInView;
function injectFromViewParentInjector(token, optional) {
    var args = [createDiTokenExpression(token)];
    if (optional) {
        args.push(o.NULL_EXPR);
    }
    return o.THIS_EXPR.prop('parentInjector').callMethod('get', args);
}
exports.injectFromViewParentInjector = injectFromViewParentInjector;
function getViewFactoryName(component, embeddedTemplateIndex) {
    return "viewFactory_" + component.type.name + embeddedTemplateIndex;
}
exports.getViewFactoryName = getViewFactoryName;
function createDiTokenExpression(token) {
    if (lang_1.isPresent(token.value)) {
        return o.literal(token.value);
    }
    else if (token.identifierIsInstance) {
        return o.importExpr(token.identifier)
            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
    }
    else {
        return o.importExpr(token.identifier);
    }
}
exports.createDiTokenExpression = createDiTokenExpression;
function createFlatArray(expressions) {
    var lastNonArrayExpressions = [];
    var result = o.literalArr([]);
    for (var i = 0; i < expressions.length; i++) {
        var expr = expressions[i];
        if (expr.type instanceof o.ArrayType) {
            if (lastNonArrayExpressions.length > 0) {
                result =
                    result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
                lastNonArrayExpressions = [];
            }
            result = result.callMethod(o.BuiltinMethod.ConcatArray, [expr]);
        }
        else {
            lastNonArrayExpressions.push(expr);
        }
    }
    if (lastNonArrayExpressions.length > 0) {
        result =
            result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
    }
    return result;
}
exports.createFlatArray = createFlatArray;
function createPureProxy(fn, argCount, pureProxyProp, view) {
    view.fields.push(new o.ClassField(pureProxyProp.name, null, [o.StmtModifier.Private]));
    var pureProxyId = argCount < identifiers_1.Identifiers.pureProxies.length ? identifiers_1.Identifiers.pureProxies[argCount] : null;
    if (lang_1.isBlank(pureProxyId)) {
        throw new exceptions_1.BaseException("Unsupported number of argument for pure functions: " + argCount);
    }
    view.createMethod.addStmt(o.THIS_EXPR.prop(pureProxyProp.name).set(o.importExpr(pureProxyId).callFn([fn])).toStmt());
}
exports.createPureProxy = createPureProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUlBza0JiaDEudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFpQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzVELDJCQUE0QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTdELElBQVksQ0FBQyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFPMUMsNEJBQTBCLGdCQUFnQixDQUFDLENBQUE7QUFFM0MsMkJBQWtDLFFBQXNCLEVBQUUsV0FBd0IsRUFDaEQsV0FBd0I7SUFDeEQsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLFFBQVEsR0FBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxJQUFJLFFBQVEsR0FBZ0IsV0FBVyxDQUFDO1FBQ3hDLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQy9FLFFBQVEsR0FBRyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1lBQzVDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLElBQUksMEJBQWEsQ0FDbkIsc0VBQW9FLFFBQVUsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFB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QUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyx5QkFBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekYsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixNQUFNLElBQUksMEJBQWEsQ0FBQyx3REFBc0QsUUFBVSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUNELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUNyQixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDakcsQ0FBQztBQVZlLHVCQUFlLGtCQVU5QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVZpZXd9IGZyb20gJy4vY29tcGlsZV92aWV3JztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4uL2lkZW50aWZpZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5SW5WaWV3KHByb3BlcnR5OiBvLkV4cHJlc3Npb24sIGNhbGxpbmdWaWV3OiBDb21waWxlVmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVkVmlldzogQ29tcGlsZVZpZXcpOiBvLkV4cHJlc3Npb24ge1xuICBpZiAoY2FsbGluZ1ZpZXcgPT09IGRlZmluZWRWaWV3KSB7XG4gICAgcmV0dXJuIHByb3BlcnR5O1xuICB9IGVsc2Uge1xuICAgIHZhciB2aWV3UHJvcDogby5FeHByZXNzaW9uID0gby5USElTX0VYUFI7XG4gICAgdmFyIGN1cnJWaWV3OiBDb21waWxlVmlldyA9IGNhbGxpbmdWaWV3O1xuICAgIHdoaWxlIChjdXJyVmlldyAhPT0gZGVmaW5lZFZpZXcgJiYgaXNQcmVzZW50KGN1cnJWaWV3LmRlY2xhcmF0aW9uRWxlbWVudC52aWV3KSkge1xuICAgICAgY3VyclZpZXcgPSBjdXJyVmlldy5kZWNsYXJhdGlvbkVsZW1lbnQudmlldztcbiAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AucHJvcCgncGFyZW50Jyk7XG4gICAgfVxuICAgIGlmIChjdXJyVmlldyAhPT0gZGVmaW5lZFZpZXcpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGBJbnRlcm5hbCBlcnJvcjogQ291bGQgbm90IGNhbGN1bGF0ZSBhIHByb3BlcnR5IGluIGEgcGFyZW50IHZpZXc6ICR7cHJvcGVydHl9YCk7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0eSBpbnN0YW5jZW9mIG8uUmVhZFByb3BFeHByKSB7XG4gICAgICBsZXQgcmVhZFByb3BFeHByOiBvLlJlYWRQcm9wRXhwciA9IHByb3BlcnR5O1xuICAgICAgLy8gTm90ZTogRG9uJ3QgY2FzdCBmb3IgbWVtYmVycyBvZiB0aGUgQXBwVmlldyBiYXNlIGNsYXNzLi4uXG4gICAgICBpZiAoZGVmaW5lZFZpZXcuZmllbGRzLnNvbWUoKGZpZWxkKSA9PiBmaWVsZC5uYW1lID09IHJlYWRQcm9wRXhwci5uYW1lKSB8fFxuICAgICAgICAgIGRlZmluZWRWaWV3LmdldHRlcnMuc29tZSgoZmllbGQpID0+IGZpZWxkLm5hbWUgPT0gcmVhZFByb3BFeHByLm5hbWUpKSB7XG4gICAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AuY2FzdChkZWZpbmVkVmlldy5jbGFzc1R5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gby5yZXBsYWNlVmFySW5FeHByZXNzaW9uKG8uVEhJU19FWFBSLm5hbWUsIHZpZXdQcm9wLCBwcm9wZXJ0eSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3IodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IGJvb2xlYW4pOiBvLkV4cHJlc3Npb24ge1xuICB2YXIgYXJncyA9IFtjcmVhdGVEaVRva2VuRXhwcmVzc2lvbih0b2tlbildO1xuICBpZiAob3B0aW9uYWwpIHtcbiAgICBhcmdzLnB1c2goby5OVUxMX0VYUFIpO1xuICB9XG4gIHJldHVybiBvLlRISVNfRVhQUi5wcm9wKCdwYXJlbnRJbmplY3RvcicpLmNhbGxNZXRob2QoJ2dldCcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Vmlld0ZhY3RvcnlOYW1lKGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZGRlZFRlbXBsYXRlSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgdmlld0ZhY3RvcnlfJHtjb21wb25lbnQudHlwZS5uYW1lfSR7ZW1iZWRkZWRUZW1wbGF0ZUluZGV4fWA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpVG9rZW5FeHByZXNzaW9uKHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YSk6IG8uRXhwcmVzc2lvbiB7XG4gIGlmIChpc1ByZXNlbnQodG9rZW4udmFsdWUpKSB7XG4gICAgcmV0dXJuIG8ubGl0ZXJhbCh0b2tlbi52YWx1ZSk7XG4gIH0gZWxzZSBpZiAodG9rZW4uaWRlbnRpZmllcklzSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gby5pbXBvcnRFeHByKHRva2VuLmlkZW50aWZpZXIpXG4gICAgICAgIC5pbnN0YW50aWF0ZShbXSwgby5pbXBvcnRUeXBlKHRva2VuLmlkZW50aWZpZXIsIFtdLCBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG8uaW1wb3J0RXhwcih0b2tlbi5pZGVudGlmaWVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhdEFycmF5KGV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSk6IG8uRXhwcmVzc2lvbiB7XG4gIHZhciBsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucyA9IFtdO1xuICB2YXIgcmVzdWx0OiBvLkV4cHJlc3Npb24gPSBvLmxpdGVyYWxBcnIoW10pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cHJlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGV4cHIgPSBleHByZXNzaW9uc1tpXTtcbiAgICBpZiAoZXhwci50eXBlIGluc3RhbmNlb2Ygby5BcnJheVR5cGUpIHtcbiAgICAgIGlmIChsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9XG4gICAgICAgICAgICByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtvLmxpdGVyYWxBcnIobGFzdE5vbkFycmF5RXhwcmVzc2lvbnMpXSk7XG4gICAgICAgIGxhc3ROb25BcnJheUV4cHJlc3Npb25zID0gW107XG4gICAgICB9XG4gICAgICByZXN1bHQgPSByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtleHByXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3ROb25BcnJheUV4cHJlc3Npb25zLnB1c2goZXhwcik7XG4gICAgfVxuICB9XG4gIGlmIChsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0ID1cbiAgICAgICAgcmVzdWx0LmNhbGxNZXRob2Qoby5CdWlsdGluTWV0aG9kLkNvbmNhdEFycmF5LCBbby5saXRlcmFsQXJyKGxhc3ROb25BcnJheUV4cHJlc3Npb25zKV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQdXJlUHJveHkoZm46IG8uRXhwcmVzc2lvbiwgYXJnQ291bnQ6IG51bWJlciwgcHVyZVByb3h5UHJvcDogby5SZWFkUHJvcEV4cHIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IENvbXBpbGVWaWV3KSB7XG4gIHZpZXcuZmllbGRzLnB1c2gobmV3IG8uQ2xhc3NGaWVsZChwdXJlUHJveHlQcm9wLm5hbWUsIG51bGwsIFtvLlN0bXRNb2RpZmllci5Qcml2YXRlXSkpO1xuICB2YXIgcHVyZVByb3h5SWQgPVxuICAgICAgYXJnQ291bnQgPCBJZGVudGlmaWVycy5wdXJlUHJveGllcy5sZW5ndGggPyBJZGVudGlmaWVycy5wdXJlUHJveGllc1thcmdDb3VudF0gOiBudWxsO1xuICBpZiAoaXNCbGFuayhwdXJlUHJveHlJZCkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5zdXBwb3J0ZWQgbnVtYmVyIG9mIGFyZ3VtZW50IGZvciBwdXJlIGZ1bmN0aW9uczogJHthcmdDb3VudH1gKTtcbiAgfVxuICB2aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KFxuICAgICAgby5USElTX0VYUFIucHJvcChwdXJlUHJveHlQcm9wLm5hbWUpLnNldChvLmltcG9ydEV4cHIocHVyZVByb3h5SWQpLmNhbGxGbihbZm5dKSkudG9TdG10KCkpO1xufVxuIl19