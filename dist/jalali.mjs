import { startOfToday as q, startOfDay as B, eachDayOfInterval as K, addDays as N } from "date-fns";
var D = {
  toJalaali: Q,
  toGregorian: R,
  isValidJalaaliDate: ee,
  isLeapJalaaliYear: Z,
  jalaaliMonthLength: $,
  jalCal: x,
  j2d: Y,
  d2j: j,
  g2d: b,
  d2g: E,
  jalaaliToDateObject: P,
  jalaaliWeek: re
}, y = [
  -61,
  9,
  38,
  199,
  426,
  686,
  756,
  818,
  1111,
  1181,
  1210,
  1635,
  2060,
  2097,
  2192,
  2262,
  2324,
  2394,
  2456,
  3178
];
function Q(e, t, r) {
  return Object.prototype.toString.call(e) === "[object Date]" && (r = e.getDate(), t = e.getMonth() + 1, e = e.getFullYear()), j(b(e, t, r));
}
function R(e, t, r) {
  return E(Y(e, t, r));
}
function ee(e, t, r) {
  return e >= -61 && e <= 3177 && t >= 1 && t <= 12 && r >= 1 && r <= $(e, t);
}
function Z(e) {
  return te(e) === 0;
}
function $(e, t) {
  return t <= 6 ? 31 : t <= 11 || Z(e) ? 30 : 29;
}
function te(e) {
  var t = y.length, r = y[0], n, a, o, i, s;
  if (e < r || e >= y[t - 1])
    throw new Error("Invalid Jalaali year " + e);
  for (s = 1; s < t && (n = y[s], a = n - r, !(e < n)); s += 1)
    r = n;
  return i = e - r, a - i < 6 && (i = i - a + u(a + 4, 33) * 33), o = f(f(i + 1, 33) - 1, 4), o === -1 && (o = 4), o;
}
function x(e, t) {
  var r = y.length, n = e + 621, a = -14, o = y[0], i, s, m, p, h, c, g;
  if (e < o || e >= y[r - 1])
    throw new Error("Invalid Jalaali year " + e);
  for (g = 1; g < r && (i = y[g], s = i - o, !(e < i)); g += 1)
    a = a + u(s, 33) * 8 + u(f(s, 33), 4), o = i;
  return c = e - o, a = a + u(c, 33) * 8 + u(f(c, 33) + 3, 4), f(s, 33) === 4 && s - c === 4 && (a += 1), p = u(n, 4) - u((u(n, 100) + 1) * 3, 4) - 150, h = 20 + a - p, t ? { gy: n, march: h } : (s - c < 6 && (c = c - s + u(s + 4, 33) * 33), m = f(f(c + 1, 33) - 1, 4), m === -1 && (m = 4), {
    leap: m,
    gy: n,
    march: h
  });
}
function Y(e, t, r) {
  var n = x(e, !0);
  return b(n.gy, 3, n.march) + (t - 1) * 31 - u(t, 7) * (t - 7) + r - 1;
}
function j(e) {
  var t = E(e).gy, r = t - 621, n = x(r, !1), a = b(t, 3, n.march), o, i, s;
  if (s = e - a, s >= 0) {
    if (s <= 185)
      return i = 1 + u(s, 31), o = f(s, 31) + 1, {
        jy: r,
        jm: i,
        jd: o
      };
    s -= 186;
  } else
    r -= 1, s += 179, n.leap === 1 && (s += 1);
  return i = 7 + u(s, 30), o = f(s, 30) + 1, {
    jy: r,
    jm: i,
    jd: o
  };
}
function b(e, t, r) {
  var n = u((e + u(t - 8, 6) + 100100) * 1461, 4) + u(153 * f(t + 9, 12) + 2, 5) + r - 34840408;
  return n = n - u(u(e + 100100 + u(t - 8, 6), 100) * 3, 4) + 752, n;
}
function E(e) {
  var t, r, n, a, o;
  return t = 4 * e + 139361631, t = t + u(u(4 * e + 183187720, 146097) * 3, 4) * 4 - 3908, r = u(f(t, 1461), 4) * 5 + 308, n = u(f(r, 153), 5) + 1, a = f(u(r, 153), 12) + 1, o = u(t, 1461) - 100100 + u(8 - a, 6), {
    gy: o,
    gm: a,
    gd: n
  };
}
function re(e, t, r) {
  var n = P(e, t, r).getDay(), a = n == 6 ? 0 : -(n + 1), o = 6 + a;
  return {
    saturday: j(Y(e, t, r + a)),
    friday: j(Y(e, t, r + o))
  };
}
function P(e, t, r, n, a, o, i) {
  var s = R(e, t, r);
  return new Date(
    s.gy,
    s.gm - 1,
    s.gd,
    n || 0,
    a || 0,
    o || 0,
    i || 0
  );
}
function u(e, t) {
  return ~~(e / t);
}
function f(e, t) {
  return e - ~~(e / t) * t;
}
const I = [
  "فر",
  "ارد",
  "خر",
  "تیر",
  "مرد",
  "شهر",
  "مهر",
  "آبا",
  "آذر",
  "دی",
  "بهم",
  "اسفن"
], ne = ["یک", "دو", "سه", "چهار", "پنج", "جمعه", "شنبه"], ae = ["یک", "دو", "سه", "چه", "پن", "جم", "شن"], oe = /\[([^\]]+)]|YYYY|YY?|yyyy|yy?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;
function d(e, t = 2) {
  let r = `${Math.abs(e)}`;
  const n = e < 0 ? "-" : "";
  for (; r.length < t; )
    r = `0${r}`;
  return n + r;
}
function v(e) {
  return Math.round(e.timezoneOffset / 15) * 15;
}
function C(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), a = Math.floor(n / 60), o = n % 60;
  return r + d(a, 2) + t + d(o, 2);
}
const F = (e, t, r) => {
  const n = e < 12 ? "AM" : "PM";
  return r ? n.toLocaleLowerCase() : n;
}, O = {
  Y(e) {
    const t = e.year;
    return t <= 9999 ? `${t}` : `+${t}`;
  },
  // Year: 00, 01, ..., 99
  yy(e) {
    return d(e.year, 4).substr(2);
  },
  // Year: 1900, 1901, ..., 2099
  yyyy(e) {
    return d(e.year, 4);
  },
  // Month: 1, 2, ..., 12
  M(e) {
    return e.month + 1;
  },
  // Month: 01, 02, ..., 12
  MM(e) {
    return d(e.month + 1, 2);
  },
  MMM(e) {
    return I[e.month];
  },
  MMMM(e) {
    return w.monthNames[e.month];
  },
  // Day of month: 1, 2, ..., 31
  d(e) {
    return e.day;
  },
  // Day of month: 01, 02, ..., 31
  dd(e) {
    return d(e.day, 2);
  },
  // Hour: 0, 1, ... 23
  H(e) {
    return e.hour;
  },
  // Hour: 00, 01, ..., 23
  HH(e) {
    return d(e.hour, 2);
  },
  // Hour: 1, 2, ..., 12
  h(e) {
    const t = e.hour;
    return t === 0 ? 12 : t > 12 ? t % 12 : t;
  },
  // Hour: 01, 02, ..., 12
  hh(...e) {
    const t = O.h(...e);
    return d(t, 2);
  },
  // Minute: 0, 1, ..., 59
  m(e) {
    return e.minute;
  },
  // Minute: 00, 01, ..., 59
  mm(e) {
    return d(e.minute, 2);
  },
  // Second: 0, 1, ..., 59
  s(e) {
    return e.second;
  },
  // Second: 00, 01, ..., 59
  ss(e) {
    return d(e.second, 2);
  },
  // 1/10 of second: 0, 1, ..., 9
  S(e) {
    return Math.floor(e.millisecond / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS(e) {
    return d(Math.floor(e.millisecond / 10), 2);
  },
  // Millisecond: 000, 001, ..., 999
  SSS(e) {
    return d(e.millisecond, 3);
  },
  // Day of week: 0, 1, ..., 6
  D(e) {
    return e.day;
  },
  // Day of week: 'Su', 'Mo', ..., 'Sa'
  DD(e) {
    return ae[e.day];
  },
  // Day of week: 'Sun', 'Mon',..., 'Sat'
  ddd(e) {
    return ne[e.day];
  },
  // Day of week: 'Sunday', 'Monday', ...,'Saturday'
  dddd(e) {
    return w.dayNames[e.day];
  },
  // AM, PM
  A(e) {
    return F(e.hour, e.minute, !1);
  },
  // am, pm
  a(e) {
    return F(e.hour, e.minute, !0);
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z(e) {
    return C(v(e), ":");
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ(e) {
    return C(v(e));
  },
  // Seconds timestamp: 512969520
  X(e) {
    return Math.floor(e.timestamp / 1e3);
  },
  // Milliseconds timestamp: 512969520900
  x(e) {
    return e.timestamp;
  },
  //   w(date) {
  //     return getWeek(date, {
  //       firstDayOfWeek: firstDayOfWeek,
  //     });
  //   },
  ww(e) {
    return d(O.w(e), 2);
  }
};
function se(e, t) {
  return (t ? String(t) : "YYYY-MM-DDTHH:mm:ss.SSSZ").replace(oe, (n, a) => a || (typeof O[n] == "function" ? `${O[n](e)}` : n));
}
const L = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
], ie = /(\[[^[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|yyyy|yy|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g, ue = /\d/, M = /\d\d/, ce = /\d{3}/, le = /\d{4}/, S = /\d\d?/, de = /[+-]\d\d:?\d\d/, fe = /[+-]?\d+/, A = "year", H = "month", z = "day", W = "hour", G = "minute", X = "second", k = "millisecond", _ = {}, l = (e, t, r) => {
  const n = Array.isArray(e) ? e : [e];
  let a;
  typeof r == "string" ? a = (o) => {
    const i = parseInt(o, 10);
    return { [r]: i };
  } : a = r, n.forEach((o) => {
    _[o] = [t, a];
  });
}, me = (e) => e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"), U = (e) => () => new RegExp(e.map(me).join("|")), V = (e, t) => (r) => {
  const n = e.indexOf(r);
  if (n < 0)
    throw new Error("Invalid Word");
  return { [t]: n };
};
l("Y", fe, A);
l("YY", M, (e) => {
  const t = (/* @__PURE__ */ new Date()).getFullYear(), r = Math.floor(t / 100);
  let n = parseInt(e, 10);
  return n = (n > 68 ? r - 1 : r) * 100 + n, { [A]: n };
});
l("yyyy", le, A);
l("M", S, (e) => ({ [H]: parseInt(e, 10) - 1 }));
l("MM", M, (e) => ({ [H]: parseInt(e, 10) - 1 }));
l(
  "MMM",
  U(I),
  V(I, H)
);
l(
  "MMMM",
  U(L),
  V(L, H)
);
l("d", S, z);
l("dd", M, z);
l(["H", "h"], S, W);
l(["HH", "hh"], M, W);
l("m", S, G);
l("mm", M, G);
l("s", S, X);
l("ss", M, X);
l("S", ue, (e) => ({
  [k]: parseInt(e, 10) * 100
}));
l("SS", M, (e) => ({
  [k]: parseInt(e, 10) * 10
}));
l("SSS", ce, k);
function he() {
  return /[ap]\.?m?\.?/i;
}
function ye(e) {
  return `${e}`.toLowerCase().charAt(0) === "p";
}
l(["A", "a"], he, (e) => ({ isPM: ye(e) }));
function ge(e) {
  const [t, r, n] = e.match(/([+-]|\d\d)/g) || ["-", "0", "0"], a = parseInt(r, 10) * 60 + parseInt(n, 10);
  return a === 0 ? 0 : t === "+" ? -a : +a;
}
l(["Z", "ZZ"], de, (e) => ({ offset: ge(e) }));
function Me(e, t) {
  if (e !== void 0 && t !== void 0) {
    if (t) {
      if (e < 12)
        return e + 12;
    } else if (e === 12)
      return 0;
  }
  return e;
}
function pe(e, t) {
  const r = t.match(ie);
  if (!r)
    throw new Error();
  const { length: n } = r;
  let a = {};
  for (let o = 0; o < n; o += 1) {
    const i = r[o], s = _[i];
    if (s) {
      const m = typeof s[0] == "function" ? s[0]() : s[0], p = s[1], h = (m.exec(e) || [])[0], c = p(h || "");
      a = { ...a, ...c }, e = e.replace(h || "", "");
    } else {
      const m = i.replace(/^\[|\]$/g, "");
      if (e.indexOf(m) === 0)
        e = e.substr(m.length);
      else
        throw new Error("not match");
    }
  }
  return a;
}
function De(e, t, r = /* @__PURE__ */ new Date()) {
  const n = {
    year: r.getFullYear(),
    month: r.getMonth(),
    day: r.getDate(),
    hour: r.getHours(),
    minute: r.getMinutes(),
    second: r.getSeconds(),
    millisecond: r.getMilliseconds(),
    timezoneOffset: r.getTimezoneOffset()
  }, a = pe(e, t);
  return ["year", "month", "day", "hour", "minute", "second", "millisecond"].forEach((o) => {
    a[o] && (n[o] = a[o] || 0);
  }), n.hour = Me(n.hour, a.isPM) || 0, a.offset !== void 0 && (n.timezoneOffset = a.offset), n;
}
const w = {
  dayNames: [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه"
  ],
  monthNames: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
  ],
  format: (e, t) => {
    if (!e)
      return "";
    const r = D.toJalaali(e);
    return se(
      {
        year: r.jy,
        month: r.jm - 1,
        day: r.jd,
        hour: e.getHours(),
        minute: e.getMinutes(),
        second: e.getSeconds(),
        millisecond: e.getMilliseconds(),
        timestamp: e.getTime(),
        timezoneOffset: e.getTimezoneOffset()
      },
      t
    );
  },
  parse: (e, t, r) => {
    const n = De(e, t, r || /* @__PURE__ */ new Date()), a = D.jalaaliToDateObject(
      n.year,
      n.month + 1,
      n.day
    );
    return a.setHours(n.hour, n.minute, n.second, n.millisecond), a;
  },
  toDateParts: (e) => new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(e).reduce((t, r) => (r.type !== "literal" && (t[r.type] = +r.value), t), {}),
  years: ({ type: e, year: t }) => {
    const r = D.toJalaali(/* @__PURE__ */ new Date()).jy;
    return [...Array(200).keys()].map((n) => ({
      type: e,
      key: e + n,
      isToday: r === n + 1300,
      isSelected: t === n + 1300,
      isHeader: !1,
      isDisabled: !1,
      disabled: !1,
      value: n + 1300,
      text: n + 1300 + ""
    }));
  },
  months: ({ type: e, month: t }) => {
    const r = D.toJalaali(/* @__PURE__ */ new Date()).jm;
    return [...w.monthNames.keys()].map((n) => ({
      type: e,
      key: e + n,
      isToday: r === n + 1,
      isSelected: t === n + 1,
      isHeader: !1,
      isDisabled: !1,
      disabled: !1,
      value: n + 1,
      text: w.monthNames[n]
    }));
  },
  days: ({ type: e, month: t, startOfWeek: r, year: n, value: a }) => {
    const o = D.jalaaliToDateObject(n, t, 1), i = D.jalaaliToDateObject(n, t + 1, 1);
    i.setDate(i.getDate() - 1);
    const s = T(r - 1, 7), m = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
      day: "numeric"
    }), p = q().getTime(), h = a ? B(a).getTime() : 0;
    return w.dayNames.map((c, g) => {
      const J = T(r + g, 7);
      return {
        type: e,
        key: "weekday" + J,
        isToday: !1,
        isSelected: !1,
        isHeader: !0,
        isDisabled: !1,
        disabled: !1,
        value: g,
        text: w.dayNames[J]
      };
    }).concat(
      K({
        start: N(o, -T(o.getDay() - r, 7)),
        end: N(i, T(s - i.getDay(), 7))
      }).map((c) => ({
        type: e,
        key: c.toString(),
        isToday: p === c.getTime(),
        isSelected: h === c.getTime(),
        isHeader: !1,
        isDisabled: !1,
        isInCurrentMonth: c < i && c >= o,
        disabled: c < o || c > i,
        value: c,
        text: m.format(c)
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
};
function T(e, t) {
  return (e % t + t) % t;
}
export {
  w as config
};
