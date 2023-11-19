function ut() {
  var e;
  const { attemptsRemaining: t } = B(),
    n = Array.from(
      document.querySelectorAll(".selected:not(#connections-nav)")
    );
  console.log("currentlySelectedItems", n);
  const o = document.getElementById("submit-button");
  if (
    n.length === y &&
    t > 0 &&
    (null == o ||
      null === (e = o.classList) ||
      void 0 === e ||
      !e.contains("inactive"))
  ) {
    var a;
    if (
      (null == o ||
        null === (a = o.classList) ||
        void 0 === a ||
        a.add("inactive"),
      (function (e) {
        const { history: t } = B(),
          n = e.map((e) => e.textContent);
        for (let e = 0; e < t.length; e++)
          if (t[e].every((e) => n.includes(e))) return !0;
        return !1;
      })(n))
    )
      return void Pe("Already guessed!");
    !(function () {
      const { attemptsRemaining: e, groupsFound: t } = B(),
        n = rt(),
        o = n[0].group;
      !(function (e) {
        const { history: t } = B();
        D("history", [...t, e.map((e) => e.text)]);
      })(n),
        (function () {
          const e = Array.from(
            document.querySelectorAll(".selected:not(#connections-nav)")
          );
          for (let t = 0; t < e.length; t++) {
            const n = e[t];
            setTimeout(() => {
              var e;
              null == n ||
                null === (e = n.classList) ||
                void 0 === e ||
                e.add("short-bounce");
            }, 110 * t),
              setTimeout(() => {
                var e;
                null == n ||
                  null === (e = n.classList) ||
                  void 0 === e ||
                  e.remove("short-bounce");
              }, 600);
          }
        })();
      for (let t = 1; t < y; t++)
        if (
          !Xe.groups[o].members
            .map((e) => e.toLowerCase())
            .includes(n[t].text.toLowerCase())
        ) {
          const t = e - 1;
          t > 0 &&
            lt() &&
            setTimeout(() => {
              Pe("One away...");
            }, 1200);
          for (let e = 0; e < n.length; e++) {
            var a;
            const t = n[e],
              o = document.getElementById("item-".concat(t.id));
            null == o ||
              null === (a = o.classList) ||
              void 0 === a ||
              a.add("inactive"),
              setTimeout(() => {
                var e;
                null == o ||
                  null === (e = o.classList) ||
                  void 0 === e ||
                  e.add("invalid-shake");
              }, 1200);
          }
          setTimeout(() => {
            n.forEach((e) => {
              const t = document.getElementById("item-".concat(e.id));
              t.classList.remove("invalid-shake"),
                t.classList.remove("inactive");
            });
          }, 2200),
            ct(t, !0, 2200);
          try {
            ft.solveAttempt(!1);
          } catch (e) {
            console.log(e);
          }
          return 0 === t && setTimeout(() => st(!1), 2200), !1;
        }
      ze();
      for (let e = 0; e < n.length; e++) n[e].solved = !0;
      const i = [...t, o];
      at(o, 1200),
        setTimeout(() => {
          for (let e = 0; e < n.length; e++) n[e].solved = !0;
          Be(i);
        }, 1200 + re),
        setTimeout(() => {
          for (let t = 0; t < n.length; t++) {
            var e;
            const o = document.getElementById("item-".concat(n[t].id));
            null == o ||
              null === (e = o.classList) ||
              void 0 === e ||
              e.add("correct");
          }
          i.length === h && (Fe(), st(!0));
        }, 1200 + re);
      try {
        const { level: e } = Xe.groups[o];
        ft.solveAttempt(!0, e);
      } catch (e) {
        console.log(e);
      }
    })();
  }
}
function lt() {
  const e = rt(),
    t = [0, 0, 0, 0];
  for (let n = 0; n < 4; n++) t[ot(e[n])]++;
  return t.includes(3);
}
function dt(e) {
  let t;
  const { groups: n } = Xe;
  return (
    Object.keys(n).forEach((o) => {
      const { members: a } = n[o];
      a.forEach((n) => {
        n.toLowerCase() === e.toLowerCase() && (t = o);
      });
    }),
    t
  );
}
