import { isPresent } from 'angular2/src/facade/lang';
import { ListWrapper, MapWrapper } from 'angular2/src/facade/collection';
export class EventListener {
    constructor(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    ;
}
export class DebugNode {
    constructor(nativeNode, parent, _debugInfo) {
        this._debugInfo = _debugInfo;
        this.nativeNode = nativeNode;
        if (isPresent(parent) && parent instanceof DebugElement) {
            parent.addChild(this);
        }
        else {
            this.parent = null;
        }
        this.listeners = [];
    }
    get injector() { return isPresent(this._debugInfo) ? this._debugInfo.injector : null; }
    get componentInstance() {
        return isPresent(this._debugInfo) ? this._debugInfo.component : null;
    }
    get locals() {
        return isPresent(this._debugInfo) ? this._debugInfo.locals : null;
    }
    get providerTokens() {
        return isPresent(this._debugInfo) ? this._debugInfo.providerTokens : null;
    }
    get source() { return isPresent(this._debugInfo) ? this._debugInfo.source : null; }
    inject(token) { return this.injector.get(token); }
    getLocal(name) { return this.locals[name]; }
}
export class DebugElement extends DebugNode {
    constructor(nativeNode, parent, _debugInfo) {
        super(nativeNode, parent, _debugInfo);
        this.properties = {};
        this.attributes = {};
        this.childNodes = [];
        this.nativeElement = nativeNode;
    }
    addChild(child) {
        if (isPresent(child)) {
            this.childNodes.push(child);
            child.parent = this;
        }
    }
    removeChild(child) {
        var childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    }
    insertChildrenAfter(child, newChildren) {
        var siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
            var nextChildren = this.childNodes.slice(siblingIndex + 1);
            this.childNodes =
                ListWrapper.concat(ListWrapper.concat(previousChildren, newChildren), nextChildren);
            for (var i = 0; i < newChildren.length; ++i) {
                var newChild = newChildren[i];
                if (isPresent(newChild.parent)) {
                    newChild.parent.removeChild(newChild);
                }
                newChild.parent = this;
            }
        }
    }
    query(predicate) {
        var results = this.queryAll(predicate);
        return results.length > 0 ? results[0] : null;
    }
    queryAll(predicate) {
        var matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    }
    queryAllNodes(predicate) {
        var matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    }
    get children() {
        var children = [];
        this.childNodes.forEach((node) => {
            if (node instanceof DebugElement) {
                children.push(node);
            }
        });
        return children;
    }
    triggerEventHandler(eventName, eventObj) {
        this.listeners.forEach((listener) => {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    }
}
export function asNativeElements(debugEls) {
    return debugEls.map((el) => el.nativeElement);
}
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(node => {
        if (node instanceof DebugElement) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
        parentNode.childNodes.forEach(node => {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
var _nativeNodeToDebugNode = new Map();
export function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
}
export function getAllDebugNodes() {
    return MapWrapper.values(_nativeNodeToDebugNode);
}
export function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
export function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfbm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtbm5MMU82ZWoudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2RlYnVnL2RlYnVnX25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxTQUFTLEVBQU8sTUFBTSwwQkFBMEI7T0FDakQsRUFBWSxXQUFXLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0NBQWdDO0FBSWpGO0lBQTZCLFlBQW1CLElBQVksRUFBUyxRQUFrQjtRQUF2QyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFFLENBQUM7O0FBQUUsQ0FBQztBQUU3RjtJQUtFLFlBQVksVUFBZSxFQUFFLE1BQWlCLEVBQVUsVUFBMkI7UUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFFBQVEsS0FBZSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWpHLElBQUksaUJBQWlCO1FBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFV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QUMsQ0FBQztnQkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLGtCQUFrQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUM7QUFFRCxzRkFBc0Y7QUFDdEYsSUFBSSxzQkFBc0IsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztBQUV2RCw2QkFBNkIsVUFBZTtJQUMxQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELCtCQUErQixJQUFlO0lBQzVDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCx5Q0FBeUMsSUFBZTtJQUN0RCxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7UHJlZGljYXRlLCBMaXN0V3JhcHBlciwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7UmVuZGVyRGVidWdJbmZvfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcblxuZXhwb3J0IGNsYXNzIEV2ZW50TGlzdGVuZXIgeyBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgY2FsbGJhY2s6IEZ1bmN0aW9uKXt9OyB9XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z05vZGUge1xuICBuYXRpdmVOb2RlOiBhbnk7XG4gIGxpc3RlbmVyczogRXZlbnRMaXN0ZW5lcltdO1xuICBwYXJlbnQ6IERlYnVnRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmVOb2RlOiBhbnksIHBhcmVudDogRGVidWdOb2RlLCBwcml2YXRlIF9kZWJ1Z0luZm86IFJlbmRlckRlYnVnSW5mbykge1xuICAgIHRoaXMubmF0aXZlTm9kZSA9IG5hdGl2ZU5vZGU7XG4gICAgaWYgKGlzUHJlc2VudChwYXJlbnQpICYmIHBhcmVudCBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgcGFyZW50LmFkZENoaWxkKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMubGlzdGVuZXJzID0gW107XG4gIH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2RlYnVnSW5mbykgPyB0aGlzLl9kZWJ1Z0luZm8uaW5qZWN0b3IgOiBudWxsOyB9XG5cbiAgZ2V0IGNvbXBvbmVudEluc3RhbmNlKCk6IGFueSB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9kZWJ1Z0luZm8pID8gdGhpcy5fZGVidWdJbmZvLmNvbXBvbmVudCA6IG51bGw7XG4gIH1cblxuICBnZXQgbG9jYWxzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2RlYnVnSW5mbykgPyB0aGlzLl9kZWJ1Z0luZm8ubG9jYWxzIDogbnVsbDtcbiAgfVxuXG4gIGdldCBwcm92aWRlclRva2VucygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9kZWJ1Z0luZm8pID8gdGhpcy5fZGVidWdJbmZvLnByb3ZpZGVyVG9rZW5zIDogbnVsbDtcbiAgfVxuXG4gIGdldCBzb3VyY2UoKTogc3RyaW5nIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9kZWJ1Z0luZm8pID8gdGhpcy5fZGVidWdJbmZvLnNvdXJjZSA6IG51bGw7IH1cblxuICBpbmplY3QodG9rZW46IGFueSk6IGFueSB7IHJldHVybiB0aGlzLmluamVjdG9yLmdldCh0b2tlbik7IH1cblxuICBnZXRMb2NhbChuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gdGhpcy5sb2NhbHNbbmFtZV07IH1cbn1cblxuZXhwb3J0IGNsYXNzIERlYnVnRWxlbWVudCBleHRlbmRzIERlYnVnTm9kZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcHJvcGVydGllczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIGF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBjaGlsZE5vZGVzOiBEZWJ1Z05vZGVbXTtcbiAgbmF0aXZlRWxlbWVudDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKG5hdGl2ZU5vZGU6IGFueSwgcGFyZW50OiBhbnksIF9kZWJ1Z0luZm86IFJlbmRlckRlYnVnSW5mbykge1xuICAgIHN1cGVyKG5hdGl2ZU5vZGUsIHBhcmVudCwgX2RlYnVnSW5mbyk7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5jaGlsZE5vZGVzID0gW107XG4gICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gbmF0aXZlTm9kZTtcbiAgfVxuXG4gIGFkZENoaWxkKGNoaWxkOiBEZWJ1Z05vZGUpIHtcbiAgICBpZiAoaXNQcmVzZW50KGNoaWxkKSkge1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLnB1c2goY2hpbGQpO1xuICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICB9XG4gIH1cblxuICByZW1vdmVDaGlsZChjaGlsZDogRGVidWdOb2RlKSB7XG4gICAgdmFyIGNoaWxkSW5kZXggPSB0aGlzLmNoaWxkTm9kZXMuaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGNoaWxkSW5kZXggIT09IC0xKSB7XG4gICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShjaGlsZEluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpbnNlcnRDaGlsZHJlbkFmdGVyKGNoaWxkOiBEZWJ1Z05vZGUsIG5ld0NoaWxkcmVuOiBEZWJ1Z05vZGVbXSkge1xuICAgIHZhciBzaWJsaW5nSW5kZXggPSB0aGlzLmNoaWxkTm9kZXMuaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKHNpYmxpbmdJbmRleCAhPT0gLTEpIHtcbiAgICAgIHZhciBwcmV2aW91c0NoaWxkcmVuID0gdGhpcy5jaGlsZE5vZGVzLnNsaWNlKDAsIHNpYmxpbmdJbmRleCArIDEpO1xuICAgICAgdmFyIG5leHRDaGlsZHJlbiA9IHRoaXMuY2hpbGROb2Rlcy5zbGljZShzaWJsaW5nSW5kZXggKyAxKTtcbiAgICAgIHRoaXMuY2hpbGROb2RlcyA9XG4gICAgICAgICAgTGlzdFdyYXBwZXIuY29uY2F0KExpc3RXcmFwcGVyLmNvbmNhdChwcmV2aW91c0NoaWxkcmVuLCBuZXdDaGlsZHJlbiksIG5leHRDaGlsZHJlbik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoaXNQcmVzZW50KG5ld0NoaWxkLnBhcmVudCkpIHtcbiAgICAgICAgICBuZXdDaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIG5ld0NoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcXVlcnkocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudCB7XG4gICAgdmFyIHJlc3VsdHMgPSB0aGlzLnF1ZXJ5QWxsKHByZWRpY2F0ZSk7XG4gICAgcmV0dXJuIHJlc3VsdHMubGVuZ3RoID4gMCA/IHJlc3VsdHNbMF0gOiBudWxsO1xuICB9XG5cbiAgcXVlcnlBbGwocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudFtdIHtcbiAgICB2YXIgbWF0Y2hlczogRGVidWdFbGVtZW50W10gPSBbXTtcbiAgICBfcXVlcnlFbGVtZW50Q2hpbGRyZW4odGhpcywgcHJlZGljYXRlLCBtYXRjaGVzKTtcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIHF1ZXJ5QWxsTm9kZXMocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdOb2RlPik6IERlYnVnTm9kZVtdIHtcbiAgICB2YXIgbWF0Y2hlczogRGVidWdOb2RlW10gPSBbXTtcbiAgICBfcXVlcnlOb2RlQ2hpbGRyZW4odGhpcywgcHJlZGljYXRlLCBtYXRjaGVzKTtcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIGdldCBjaGlsZHJlbigpOiBEZWJ1Z0VsZW1lbnRbXSB7XG4gICAgdmFyIGNoaWxkcmVuOiBEZWJ1Z0VsZW1lbnRbXSA9IFtdO1xuICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIHRyaWdnZXJFdmVudEhhbmRsZXIoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50T2JqOiBhbnkpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgaWYgKGxpc3RlbmVyLm5hbWUgPT0gZXZlbnROYW1lKSB7XG4gICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrKGV2ZW50T2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNOYXRpdmVFbGVtZW50cyhkZWJ1Z0VsczogRGVidWdFbGVtZW50W10pOiBhbnkge1xuICByZXR1cm4gZGVidWdFbHMubWFwKChlbCkgPT4gZWwubmF0aXZlRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIF9xdWVyeUVsZW1lbnRDaGlsZHJlbihlbGVtZW50OiBEZWJ1Z0VsZW1lbnQsIHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnRWxlbWVudD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczogRGVidWdFbGVtZW50W10pIHtcbiAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnQpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUobm9kZSkpIHtcbiAgICAgICAgbWF0Y2hlcy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgICAgX3F1ZXJ5RWxlbWVudENoaWxkcmVuKG5vZGUsIHByZWRpY2F0ZSwgbWF0Y2hlcyk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gX3F1ZXJ5Tm9kZUNoaWxkcmVuKHBhcmVudE5vZGU6IERlYnVnTm9kZSwgcHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdOb2RlPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOiBEZWJ1Z05vZGVbXSkge1xuICBpZiAocGFyZW50Tm9kZSBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgIHBhcmVudE5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICBtYXRjaGVzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIERlYnVnRWxlbWVudCkge1xuICAgICAgICBfcXVlcnlOb2RlQ2hpbGRyZW4obm9kZSwgcHJlZGljYXRlLCBtYXRjaGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vLyBOZWVkIHRvIGtlZXAgdGhlIG5vZGVzIGluIGEgZ2xvYmFsIE1hcCBzbyB0aGF0IG11bHRpcGxlIGFuZ3VsYXIgYXBwcyBhcmUgc3VwcG9ydGVkLlxudmFyIF9uYXRpdmVOb2RlVG9EZWJ1Z05vZGUgPSBuZXcgTWFwPGFueSwgRGVidWdOb2RlPigpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVidWdOb2RlKG5hdGl2ZU5vZGU6IGFueSk6IERlYnVnTm9kZSB7XG4gIHJldHVybiBfbmF0aXZlTm9kZVRvRGVidWdOb2RlLmdldChuYXRpdmVOb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbERlYnVnTm9kZXMoKTogRGVidWdOb2RlW10ge1xuICByZXR1cm4gTWFwV3JhcHBlci52YWx1ZXMoX25hdGl2ZU5vZGVUb0RlYnVnTm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleERlYnVnTm9kZShub2RlOiBEZWJ1Z05vZGUpIHtcbiAgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5zZXQobm9kZS5uYXRpdmVOb2RlLCBub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURlYnVnTm9kZUZyb21JbmRleChub2RlOiBEZWJ1Z05vZGUpIHtcbiAgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5kZWxldGUobm9kZS5uYXRpdmVOb2RlKTtcbn1cbiJdfQ==