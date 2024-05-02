import ee, { createContext as _, useContext as x, useEffect as g, Fragment as V, isValidElement as ne, cloneElement as re, createElement as te, forwardRef as Y, useLayoutEffect as q, useRef as v, useId as oe, useMemo as M, useState as U, useCallback as se, useReducer as ie } from "react";
import { jsx as B } from "react/jsx-runtime";
import { offset as ce, flip as ae, shift as ue, useFloating as de, autoUpdate as le } from "@floating-ui/react-dom";
import { isValid as fe, format as pe, parse as ye, startOfMonth as me, endOfMonth as he, startOfToday as ke, startOfDay as ge, eachDayOfInterval as we, addDays as H, isEqual as ve } from "date-fns";
function R(e, t) {
  if (e in t) {
    const r = t[e];
    return typeof r == "function" ? r(e) : r;
  }
  throw new Error("Invalid match value");
}
function E(e, t) {
  return (e % t + t) % t;
}
const De = (e, { type: t, payload: r }) => {
  switch (t) {
    case "action":
      return S(e, r);
    case "registerPicker":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [r.id]: {
            nestedLevel: r.nestedLevel,
            defaultType: r.defaultType,
            type: r.defaultType,
            attach: void 0,
            isOpen: r.defaultOpen,
            alwaysOpen: r.alwaysOpen
          }
        }
      };
    case "unregisterPicker": {
      const { [r]: n, ...o } = e.pickers;
      return { ...e, pickers: o };
    }
    case "select": {
      const n = r.action ? S(e, {
        action: r.action,
        pickerId: r.pickerId
      }) : { ...e };
      let o = null;
      switch (r.item.type) {
        case "day": {
          o = new Date(r.item.value), o.setHours(e.hour, e.minute);
          break;
        }
        case "month": {
          n.month = r.item.value;
          break;
        }
        case "year": {
          n.year = r.item.value;
          break;
        }
        case "hour": {
          o = e.valueRef.current ? new Date(e.valueRef.current) : /* @__PURE__ */ new Date(), o.setHours(r.item.value), n.hour = r.item.value;
          break;
        }
        case "minute": {
          o = e.valueRef.current ? new Date(e.valueRef.current) : /* @__PURE__ */ new Date(), o.setMinutes(r.item.value), n.minute = r.item.value;
          break;
        }
        default:
          return e;
      }
      return o && n.onChange(o), n;
    }
    case "defaultChanged":
      return {
        ...e,
        ...r
      };
    case "externalValueChanged": {
      const n = e.config.toDateParts(r);
      return {
        ...e,
        year: n.year,
        month: n.month,
        hour: r.getHours(),
        minute: r.getMinutes()
      };
    }
    default:
      throw new Error("Invalid action " + t);
  }
};
function S(e, t) {
  let r = t.action, n = "";
  const o = t.action.match(
    /^(open|close|next|prev|showYear|showMonth|showDay|toggleYear|toggleMonth|toggleDay|toggle)(.*)$/
  );
  if (o && (r = o[1], n = o[2], n === "" && (n = t.pickerId || Object.keys(e.pickers).reverse()[0], n === void 0)))
    throw new Error("There is no Picker in the current Provider");
  switch (r) {
    case "open":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            attach: t.ref,
            isOpen: !0
          }
        }
      };
    case "close":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            isOpen: !1,
            type: e.pickers[n].defaultType
          }
        }
      };
    case "toggle":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            attach: t.ref,
            isOpen: !e.pickers[n].isOpen,
            type: e.pickers[n].defaultType
          }
        }
      };
    case "next": {
      if (!e.pickers[n].type)
        return e;
      const { month: i, year: s } = e;
      return R(e.pickers[n].type, {
        hour: () => e,
        minute: () => e,
        day: () => ({
          ...e,
          year: i === 12 ? s + 1 : s,
          month: i % 12 + 1
        }),
        month: () => ({
          ...e,
          year: s + 1,
          month: i
        }),
        year: () => ({
          ...e,
          year: s + 1,
          month: i
        })
      });
    }
    case "prev": {
      if (!e.pickers[n].type)
        return e;
      const { month: i, year: s } = e;
      return R(e.pickers[n].type, {
        hour: () => e,
        minute: () => e,
        day: () => ({
          ...e,
          year: i === 1 ? s - 1 : s,
          month: E(i - 2, 12) + 1
        }),
        month: () => ({
          ...e,
          year: s - 1,
          month: i
        }),
        year: () => ({
          ...e,
          year: s - 1,
          month: i
        })
      });
    }
    case "showYear":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            type: "year"
          }
        }
      };
    case "toggleYear":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            type: e.pickers[n].type === "year" ? e.pickers[n].defaultType : "year"
          }
        }
      };
    case "showMonth":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            type: "month"
          }
        }
      };
    case "toggleMonth":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            type: e.pickers[n].type === "month" ? e.pickers[n].defaultType : "month"
          }
        }
      };
    case "showDay":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            type: "day"
          }
        }
      };
    case "toggleDay":
      return {
        ...e,
        pickers: {
          ...e.pickers,
          [n]: {
            ...e.pickers[n],
            type: e.pickers[n].type === "day" ? e.pickers[n].defaultType : "day"
          }
        }
      };
    case "today": {
      const i = /* @__PURE__ */ new Date();
      i.setHours(e.hour, e.minute), e.onChange(i);
      const s = e.config.toDateParts(i);
      return {
        ...e,
        year: s.year,
        month: s.month
      };
    }
    case "todayHour": {
      const i = /* @__PURE__ */ new Date();
      e.onChange(i);
      const s = e.config.toDateParts(i);
      return {
        ...e,
        year: s.year,
        month: s.month
      };
    }
    default:
      throw new Error("Invalid action " + t.action);
  }
}
const G = _(null);
function be() {
  const e = x(G);
  if (!e)
    throw new Error("You need to use component inside Datepicker");
  return e;
}
function P() {
  const e = be();
  return {
    ...e,
    slot: J(e.state)
  };
}
function J(e) {
  return {
    pickers: e.pickers,
    disabled: e.disabled,
    value: e.valueRef.current,
    month: e.month,
    monthName: e.config.monthNames[e.month - 1],
    year: e.year,
    hour: e.hour,
    minute: e.minute
  };
}
const N = (e, t) => {
  g(() => {
    t && (typeof t == "function" ? t(e.current) : t.current = e.current);
  });
};
function j(...e) {
  return e.filter(Boolean).join(" ");
}
function b(e, t, r = {}, n, o, i = {}) {
  if ((i == null ? void 0 : i.visible) === !1 && i.hideOnClose !== !0)
    return null;
  const { as: s, children: a, ...c } = $(t, e), l = s || n, p = typeof a == "function" ? a(r) : a;
  if (typeof c.className == "function" && (c.className = c.className(r)), l === V && Object.keys(c).length > 0) {
    if (!ne(p) || Array.isArray(p) && p.length > 1)
      throw new Error(
        [
          'Passing props on "Fragment"!',
          "",
          'The current component is rendering a "Fragment".',
          "However we need to passthrough the following props:",
          Object.keys(c).map((y) => `  - ${y}`).join(`
`),
          "",
          "You can apply a few solutions:",
          [
            'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
            "Render a single element as the child so that we can forward the props onto that element."
          ].map((y) => `  - ${y}`).join(`
`)
        ].join(`
`)
      );
    const { childClassName: u, ...m } = p.props, d = typeof u == "function" ? (...y) => j(u(...y), c.className) : j(u, c.className), w = d ? { className: d, ref: o } : { ref: o };
    return re(
      p,
      Object.assign(
        {},
        // Filter out undefined values so that they don't override the existing values
        $(m, c),
        w
      )
    );
  }
  return te(l, { ...c, ref: o }, p);
}
function $(...e) {
  if (e.length === 0)
    return {};
  if (e.length === 1)
    return e[0];
  const t = {}, r = {};
  for (const n of e)
    for (const o in n)
      o.startsWith("on") && typeof n[o] == "function" ? (r[o] ?? (r[o] = []), r[o].push(n[o])) : t[o] = n[o];
  if (t.disabled || t["aria-disabled"])
    return Object.assign(
      t,
      // Set all event listeners that we collected to `undefined`. This is
      // important because of the `cloneElement` from above, which merges the
      // existing and new props, they don't just override therefore we have to
      // explicitly nullify them.
      Object.fromEntries(
        Object.keys(r).map((n) => [n, void 0])
      )
    );
  for (const n in r)
    Object.assign(t, {
      [n](o, ...i) {
        const s = r[n];
        for (const a of s) {
          if ((o instanceof Event || (o == null ? void 0 : o.nativeEvent) instanceof Event) && o.defaultPrevented)
            return;
          a(o, ...i);
        }
      }
    });
  return t;
}
function O(e) {
  return Y(e);
}
const W = typeof window < "u" ? q : g;
function Ee(e, t, r, n) {
  const o = v(t);
  W(() => {
    o.current = t;
  }, [t]), g(() => {
    const i = (r == null ? void 0 : r.current) ?? window;
    if (!(i && i.addEventListener))
      return;
    const s = (c) => o.current(c), a = document.getElementById("shadow-host");
    return a ? document.addEventListener.bind(a.shadowRoot)(
      e,
      s,
      n
    ) : document.addEventListener(e, s, n), () => {
      const c = document.getElementById("shadow-host");
      c ? document.removeEventListener.bind(c.shadowRoot)(
        e,
        s,
        n
      ) : document.removeEventListener(e, s, n);
    };
  }, [e, r, n]);
}
function Te(e, t) {
  Ee("mousedown", (r) => {
    (Array.isArray(e) ? e : [e]).some((n) => {
      if (n === void 0)
        return !1;
      const o = n == null ? void 0 : n.current;
      if (!o || o.contains(r.target))
        return !0;
    }) || t(r);
  });
}
const Ae = "div", xe = [
  ce(10),
  ae({ fallbackAxisSideDirection: "end", crossAxis: !1 }),
  ue()
], A = _({ nestedLevel: 0 }), Pe = O(
  ({
    alwaysOpen: e,
    hideOnClose: t,
    middleware: r = xe,
    attachTo: n,
    style: o,
    defaultType: i,
    defaultOpen: s = !1,
    disableClickOutside: a = !1,
    id: c,
    ...l
  }, p) => {
    const { nestedLevel: u } = x(A), m = oe(), d = c || m, { state: w, slot: y, dispatch: k } = P(), D = v(i), F = v(s);
    g(() => (k({
      type: "registerPicker",
      payload: {
        id: d,
        nestedLevel: u + 1,
        defaultType: D.current,
        defaultOpen: F.current,
        alwaysOpen: e
      }
    }), () => k({ type: "unregisterPicker", payload: d })), [k, d, u, e]);
    const f = w.pickers[d], h = n === !1 ? void 0 : n !== void 0 ? n : e || f == null ? void 0 : f.attach, I = e || (f == null ? void 0 : f.isOpen) || !1, { refs: L, floatingStyles: Q } = de({
      open: I,
      elements: {
        reference: h ? h.current : null
      },
      middleware: r,
      whileElementsMounted: le
    });
    N(L.floating, p);
    const X = () => {
      a !== !0 && (f != null && f.isOpen) && k({
        type: "action",
        payload: { action: `close${d}` }
      });
    };
    Te([L.floating, h], X);
    const Z = {
      style: {
        ...o,
        ...h != null && h.current ? Q : {}
      }
    };
    return /* @__PURE__ */ B(
      A.Provider,
      {
        value: M(
          () => ({
            nestedLevel: u + 1,
            id: d,
            defaultType: D.current
          }),
          [u, d]
        ),
        children: b(Z, l, y, Ae, L.setFloating, {
          visible: I,
          hideOnClose: t
        })
      }
    );
  }
), Oe = "button", Ce = O(
  ({ action: e, ...t }, r) => {
    const { id: n } = x(A), o = v(null);
    N(o, r);
    const { slot: i, dispatch: s } = P();
    return b({
      onClick: () => s({
        type: "action",
        payload: { action: e, ref: o, pickerId: n }
      })
    }, t, i, Oe, o);
  }
);
function K() {
  const [e] = U(Fe);
  return g(() => () => e.dispose(), [e]), e;
}
function Fe() {
  const e = [], t = {
    addEventListener(r, n, o, i) {
      return r.addEventListener(n, o, i), t.add(
        () => r.removeEventListener(n, o, i)
      );
    },
    requestAnimationFrame(...r) {
      const n = requestAnimationFrame(...r);
      return t.add(() => cancelAnimationFrame(n));
    },
    nextFrame(...r) {
      return t.requestAnimationFrame(() => t.requestAnimationFrame(...r));
    },
    add(r) {
      return e.push(r), () => {
        const n = e.indexOf(r);
        if (n >= 0)
          for (const o of e.splice(n, 1))
            o();
      };
    },
    dispose() {
      for (const r of e.splice(0))
        r();
    }
  };
  return t;
}
const C = function(t) {
  const r = v(t);
  return W(() => {
    r.current = t;
  }, [t]), ee.useCallback((...n) => r.current(...n), [r]);
}, Ie = "input", Le = O(
  ({
    format: e = "yyyy/MM/dd",
    parse: t,
    type: r,
    ...n
  }, o) => {
    const i = v(null);
    N(i, o);
    const { state: s, slot: a, dispatch: c } = P(), l = se(
      (f) => typeof e == "function" ? e(f) : s.config.format(f, e),
      [e, s.config]
    ), [p, u] = U(
      void 0
    ), m = M(
      () => l(a.value),
      [a.value, l]
    ), d = K(), w = C(
      () => d.nextFrame(
        () => c({
          type: "action",
          payload: { action: "open", ref: i }
        })
      )
    ), y = C((f) => u(f.target.value)), k = C((f) => {
      let h = null;
      if (f.target.value)
        try {
          h = typeof e == "function" ? t(f.target.value, a.value) : s.config.parse(f.target.value, e, a.value);
        } catch {
        }
      h !== null && fe(h) && s.onChange(h), d.nextFrame(() => u(void 0));
    }), D = typeof e == "function" && typeof t != "function", F = {
      type: r || "text",
      readOnly: D,
      disabled: s.disabled,
      value: p !== void 0 ? p : m,
      onFocus: w,
      onChange: D ? void 0 : y,
      onBlur: D ? void 0 : k
    };
    return b(F, n, a, Ie, i);
  }
), Me = "button", z = "data-calendar-item-id", Ne = O(
  ({ item: e, action: t, ...r }, n) => {
    const { id: o } = x(A), { state: i, slot: s, dispatch: a } = P(), c = {
      [z]: e.type + "-" + e.text,
      onClick: "isHeader" in e && e.isHeader || i.disabled ? void 0 : () => {
        a({
          type: "select",
          payload: { item: e, pickerId: o, action: t }
        });
      }
    };
    return b(c, r, s, Me, n);
  }
);
function He(e, t, r) {
  q(() => {
    if (e && r && t) {
      const n = document.querySelector(
        `[${z}="${t}-${r}"]`
      );
      n && n.scrollIntoView({ block: "nearest" });
    }
  }, [t, r, e]);
}
const Re = "div", Se = O(
  ({
    type: e,
    disableAutoScroll: t,
    ...r
  }, n) => {
    const { id: o, defaultType: i } = x(A), { state: s } = P(), a = o ? s.pickers[o] : void 0, c = e || (a == null ? void 0 : a.type) || i;
    if (c === void 0)
      throw new Error(
        "No type provided, You need either need set the type to Items or set the defaultType to Picker component"
      );
    const l = s.valueRef.current, p = M(
      () => c === "hour" || c === "minute" ? s.config[c + "s"]({
        type: c,
        hour: s.hour,
        minute: s.minute
      }) : s.config[c + "s"]({
        type: c,
        year: s.year,
        month: s.month,
        value: l,
        startOfWeek: s.startOfWeek
      }),
      [
        c,
        l,
        s.config,
        s.month,
        s.year,
        s.hour,
        s.minute,
        s.startOfWeek
      ]
    );
    return He(
      t !== !0 && a !== void 0 && (a.alwaysOpen === !0 || a.isOpen) && ["year", "hour", "minute"].includes(c),
      c,
      c !== "day" ? s[c] : void 0
    ), b(
      {},
      r,
      {
        items: p,
        type: c,
        ...s
      },
      Re,
      n
    );
  }
), T = {
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  format: (e, t) => e ? pe(e, t) : "",
  parse: (e, t, r) => ye(e, t, r || /* @__PURE__ */ new Date()),
  toDateParts: (e) => new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(e).reduce((t, r) => (r.type !== "literal" && (t[r.type] = +r.value), t), {}),
  years: ({ type: e, year: t }) => {
    const r = (/* @__PURE__ */ new Date()).getFullYear();
    return [...Array(200).keys()].map((n) => ({
      type: e,
      key: e + n,
      isToday: r === n + 1900,
      isSelected: t === n + 1900,
      isHeader: !1,
      isDisabled: !1,
      disabled: !1,
      value: n + 1900,
      text: n + 1900 + ""
    }));
  },
  months: ({ type: e, month: t }) => {
    const r = (/* @__PURE__ */ new Date()).getMonth();
    return [...T.monthNames.keys()].map((n) => ({
      type: e,
      key: e + n,
      isToday: r === n,
      isSelected: t === n + 1,
      isHeader: !1,
      isDisabled: !1,
      disabled: !1,
      value: n + 1,
      text: T.monthNames[n]
    }));
  },
  days: ({ type: e, month: t, startOfWeek: r, year: n, value: o }) => {
    const i = new Date(n, t - 1, 1), s = me(i), a = he(i), c = E(r - 1, 7), l = ke().getTime(), p = o ? ge(o).getTime() : 0;
    return T.dayNames.map((u, m) => {
      const d = E(r + m, 7);
      return {
        type: e,
        key: "weekday" + d,
        isToday: !1,
        isSelected: !1,
        isHeader: !0,
        isDisabled: !1,
        disabled: !1,
        value: m,
        text: T.dayNames[d]
      };
    }).concat(
      we({
        start: H(s, -E(s.getDay() - r, 7)),
        end: H(a, E(c - a.getDay(), 7))
      }).map((u) => ({
        type: e,
        key: u.toString(),
        isToday: l === u.getTime(),
        isSelected: p === u.getTime(),
        isHeader: !1,
        isInCurrentMonth: u < s || u > a,
        isDisabled: u < s || u > a,
        disabled: u < s || u > a,
        value: u,
        text: u.getDate() + ""
      }))
    );
  },
  hours: ({ type: e, hour: t }) => [...Array(24).keys()].map((r) => ({
    type: e,
    key: r,
    value: r,
    text: r + "",
    isToday: !1,
    isSelected: t === r,
    isHeader: !1,
    isDisabled: !1,
    disabled: !1
  })),
  minutes: ({ type: e, minute: t }) => [...Array(60).keys()].map((r) => ({
    type: e,
    key: r,
    value: r,
    text: r + "",
    isToday: !1,
    isSelected: t === r,
    isHeader: !1,
    isDisabled: !1,
    disabled: !1
  }))
}, je = V, $e = Y(
  ({
    defaultValue: e,
    value: t,
    onChange: r,
    disabledKeyboardNavigation: n,
    disabled: o = !1,
    config: i = T,
    startOfWeek: s = 0,
    ...a
  }, c) => {
    const l = v(t || e || null), p = K(), u = C((y) => {
      _e(l.current, y) || p.nextFrame(() => {
        l.current = y, r == null || r(l.current), d({
          type: "externalValueChanged",
          payload: y || /* @__PURE__ */ new Date()
        });
      });
    }), [m, d] = ie(De, null, () => {
      const y = l.current || /* @__PURE__ */ new Date(), k = i.toDateParts(y);
      return {
        config: i,
        disabled: o,
        year: k.year,
        month: k.month,
        hour: y.getHours(),
        minute: y.getMinutes(),
        calendarOpen: !1,
        hourOpen: !1,
        valueRef: l,
        startOfWeek: s,
        onChange: u,
        pickers: {}
      };
    });
    g(() => {
      u(t || null);
    }, [t, u]), g(() => {
      d({ type: "defaultChanged", payload: { startOfWeek: s } });
    }, [s]), g(() => {
      d({ type: "defaultChanged", payload: { disabled: o } });
    }, [o]);
    const w = {};
    return /* @__PURE__ */ B(G.Provider, { value: { state: m, dispatch: d }, children: b(w, a, J(m), je, c) });
  }
);
function _e(e, t) {
  return e === t || e !== null && t !== null && ve(e, t);
}
const Be = Object.assign($e, {
  Picker: Pe,
  Input: Le,
  Button: Ce,
  Items: Se,
  Item: Ne
});
export {
  Be as Datepicker,
  T as config
};
