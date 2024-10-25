var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/utils/parseFnCall.ts
function getNodeChain(node) {
  if (isSupportedAccessor(node)) {
    return [node];
  }
  switch (node.type) {
    case "TaggedTemplateExpression":
      return getNodeChain(node.tag);
    case "MemberExpression":
      return joinChains(getNodeChain(node.object), getNodeChain(node.property));
    case "CallExpression":
      return getNodeChain(node.callee);
  }
  return null;
}
function determinePlaywrightFnGroup(name) {
  if (name === "step")
    return "step";
  if (name === "expect")
    return "expect";
  if (name === "describe")
    return "describe";
  if (name === "test")
    return "test";
  if (testHooks.has(name))
    return "hook";
  return "unknown";
}
function getExpectArguments(call) {
  return findParent(call.head.node, "CallExpression")?.arguments ?? [];
}
function parse(context, node) {
  const chain = getNodeChain(node);
  if (!chain?.length) {
    return null;
  }
  const [first, ...rest] = chain;
  const resolved = resolveToPlaywrightFn(context, first);
  if (!resolved)
    return null;
  let name = resolved.original ?? resolved.local;
  const links = [name, ...rest.map((link) => getStringValue(link))];
  if (name !== "expect" && !VALID_CHAINS.has(links.join("."))) {
    return null;
  }
  if (name === "test" && links.length > 1) {
    const nextLinkName = links[1];
    const nextLinkGroup = determinePlaywrightFnGroup(nextLinkName);
    if (nextLinkGroup !== "unknown") {
      name = nextLinkName;
    }
  }
  const parsedFnCall = {
    head: { ...resolved, node: first },
    // every member node must have a member expression as their parent
    // in order to be part of the call chain we're parsing
    members: rest,
    name
  };
  const group = determinePlaywrightFnGroup(name);
  if (group === "expect") {
    const result = parseExpectCall(parsedFnCall);
    if (typeof result === "string" && findTopMostCallExpression(node) !== node) {
      return null;
    }
    if (result === "matcher-not-found") {
      if (getParent(node)?.type === "MemberExpression") {
        return "matcher-not-called";
      }
    }
    return result;
  }
  if (chain.slice(0, chain.length - 1).some((n) => getParent(n)?.type !== "MemberExpression")) {
    return null;
  }
  const parent = getParent(node);
  if (parent?.type === "CallExpression" || parent?.type === "MemberExpression") {
    return null;
  }
  let type = group;
  if ((name === "test" || name === "describe") && (node.arguments.length < 2 || !isFunction(node.arguments.at(-1)))) {
    type = "config";
  }
  return {
    ...parsedFnCall,
    group,
    type
  };
}
function parseFnCallWithReason(context, node) {
  if (cache.has(node)) {
    return cache.get(node);
  }
  const call = parse(context, node);
  cache.set(node, call);
  return call;
}
function parseFnCall(context, node) {
  const call = parseFnCallWithReason(context, node);
  return typeof call === "string" ? null : call;
}
var testHooks, VALID_CHAINS, joinChains, isSupportedAccessor, resolvePossibleAliasedGlobal, resolveToPlaywrightFn, modifiers, findModifiersAndMatcher, parseExpectCall, findTopMostCallExpression, cache, isTypeOfFnCall;
var init_parseFnCall = __esm({
  "src/utils/parseFnCall.ts"() {
    "use strict";
    init_ast();
    testHooks = /* @__PURE__ */ new Set(["afterAll", "afterEach", "beforeAll", "beforeEach"]);
    VALID_CHAINS = /* @__PURE__ */ new Set([
      // Hooks
      "afterAll",
      "afterEach",
      "beforeAll",
      "beforeEach",
      "test.afterAll",
      "test.afterEach",
      "test.beforeAll",
      "test.beforeEach",
      // Describe
      "describe",
      "describe.only",
      "describe.skip",
      "describe.fixme",
      "describe.fixme.only",
      "describe.configure",
      "describe.serial",
      "describe.serial.only",
      "describe.serial.skip",
      "describe.serial.fixme",
      "describe.serial.fixme.only",
      "describe.parallel",
      "describe.parallel.only",
      "describe.parallel.skip",
      "describe.parallel.fixme",
      "describe.parallel.fixme.only",
      "test.describe",
      "test.describe.only",
      "test.describe.skip",
      "test.describe.fixme",
      "test.describe.fixme.only",
      "test.describe.configure",
      "test.describe.serial",
      "test.describe.serial.only",
      "test.describe.serial.skip",
      "test.describe.serial.fixme",
      "test.describe.serial.fixme.only",
      "test.describe.parallel",
      "test.describe.parallel.only",
      "test.describe.parallel.skip",
      "test.describe.parallel.fixme",
      "test.describe.parallel.fixme.only",
      // Test
      "test",
      "test.fail",
      "test.fixme",
      "test.only",
      "test.skip",
      "test.step",
      "test.slow",
      "test.use"
    ]);
    joinChains = (a, b) => a && b ? [...a, ...b] : null;
    isSupportedAccessor = (node, value) => isIdentifier(node, value) || isStringNode(node, value);
    resolvePossibleAliasedGlobal = (context, global) => {
      const globalAliases = context.settings.playwright?.globalAliases ?? {};
      const alias = Object.entries(globalAliases).find(
        ([, aliases]) => aliases.includes(global)
      );
      return alias?.[0] ?? null;
    };
    resolveToPlaywrightFn = (context, accessor) => {
      const ident = getStringValue(accessor);
      const resolved = /(^expect|Expect)$/.test(ident) ? "expect" : ident;
      return {
        // eslint-disable-next-line sort/object-properties
        original: resolvePossibleAliasedGlobal(context, resolved),
        local: resolved
      };
    };
    modifiers = /* @__PURE__ */ new Set(["not", "resolves", "rejects"]);
    findModifiersAndMatcher = (members) => {
      const modifiers2 = [];
      for (const member of members) {
        const name = getStringValue(member);
        if (name === "soft" || name === "poll") {
          if (modifiers2.length > 0) {
            return "modifier-unknown";
          }
        } else if (name === "resolves" || name === "rejects") {
          const lastModifier = getStringValue(modifiers2.at(-1));
          if (lastModifier && lastModifier !== "soft" && lastModifier !== "poll") {
            return "modifier-unknown";
          }
        } else if (name !== "not") {
          if (member.parent?.type === "MemberExpression" && member.parent.parent?.type === "CallExpression") {
            return {
              matcher: member,
              matcherArgs: member.parent.parent.arguments,
              matcherName: name,
              modifiers: modifiers2
            };
          }
          return "modifier-unknown";
        }
        modifiers2.push(member);
      }
      return "matcher-not-found";
    };
    parseExpectCall = (call) => {
      const modifiersAndMatcher = findModifiersAndMatcher(call.members);
      if (typeof modifiersAndMatcher === "string") {
        return modifiersAndMatcher;
      }
      return {
        ...call,
        args: getExpectArguments(call),
        group: "expect",
        type: "expect",
        ...modifiersAndMatcher
      };
    };
    findTopMostCallExpression = (node) => {
      let top = node;
      let parent = getParent(node);
      let child = node;
      while (parent) {
        if (parent.type === "CallExpression" && parent.callee === child) {
          top = parent;
          node = parent;
          parent = getParent(parent);
          continue;
        }
        if (parent.type !== "MemberExpression") {
          break;
        }
        child = parent;
        parent = getParent(parent);
      }
      return top;
    };
    cache = /* @__PURE__ */ new WeakMap();
    isTypeOfFnCall = (context, node, types) => {
      const call = parseFnCall(context, node);
      return call !== null && types.includes(call.type);
    };
  }
});

// src/utils/ast.ts
function getStringValue(node) {
  if (!node)
    return "";
  return node.type === "Identifier" ? node.name : node.type === "TemplateLiteral" ? node.quasis[0].value.raw : node.type === "Literal" && typeof node.value === "string" ? node.value : "";
}
function getRawValue(node) {
  return node.type === "Literal" ? node.raw : void 0;
}
function isIdentifier(node, name) {
  return node.type === "Identifier" && (!name || (typeof name === "string" ? node.name === name : name.test(node.name)));
}
function isLiteral(node, type, value) {
  return node.type === "Literal" && (value === void 0 ? typeof node.value === type : node.value === value);
}
function isStringLiteral(node, value) {
  return isLiteral(node, "string", value);
}
function isBooleanLiteral(node, value) {
  return isLiteral(node, "boolean", value);
}
function isStringNode(node, value) {
  return node && (isStringLiteral(node, value) || isTemplateLiteral(node, value));
}
function isPropertyAccessor(node, name) {
  return getStringValue(node.property) === name;
}
function getParent(node) {
  return node.parent;
}
function findParent(node, type) {
  const parent = node.parent;
  if (!parent)
    return;
  return parent.type === type ? parent : findParent(parent, type);
}
function dig(node, identifier) {
  return node.type === "MemberExpression" ? dig(node.property, identifier) : node.type === "CallExpression" ? dig(node.callee, identifier) : node.type === "Identifier" ? isIdentifier(node, identifier) : false;
}
function isPageMethod(node, name) {
  return node.callee.type === "MemberExpression" && dig(node.callee.object, /(^(page|frame)|(Page|Frame)$)/) && isPropertyAccessor(node.callee, name);
}
function isFunction(node) {
  return node?.type === "ArrowFunctionExpression" || node?.type === "FunctionExpression";
}
function getNodeName(node) {
  if (isSupportedAccessor(node)) {
    return getStringValue(node);
  }
  switch (node.type) {
    case "TaggedTemplateExpression":
      return getNodeName(node.tag);
    case "MemberExpression":
      return joinNames(getNodeName(node.object), getNodeName(node.property));
    case "NewExpression":
    case "CallExpression":
      return getNodeName(node.callee);
  }
  return null;
}
function isNodeLastAssignment(node, assignment) {
  if (node.range && assignment.range && node.range[0] < assignment.range[1]) {
    return false;
  }
  return assignment.left.type === "Identifier" && assignment.left.name === node.name;
}
function dereference(context, node) {
  if (node?.type !== "Identifier") {
    return node;
  }
  const scope = context.sourceCode.getScope(node);
  const parents = scope.references.map((ref) => ref.identifier).map((ident) => ident.parent);
  const decl = parents.filter(isVariableDeclarator).find((p) => p.id.type === "Identifier" && p.id.name === node.name);
  const expr = parents.filter(isAssignmentExpression).reverse().find((assignment) => isNodeLastAssignment(node, assignment));
  return expr?.right ?? decl?.init;
}
var isTemplateLiteral, equalityMatchers, joinNames, isVariableDeclarator, isAssignmentExpression;
var init_ast = __esm({
  "src/utils/ast.ts"() {
    "use strict";
    init_parseFnCall();
    isTemplateLiteral = (node, value) => node.type === "TemplateLiteral" && node.quasis.length === 1 && // bail out if not simple
    (value === void 0 || node.quasis[0].value.raw === value);
    equalityMatchers = /* @__PURE__ */ new Set(["toBe", "toEqual", "toStrictEqual"]);
    joinNames = (a, b) => a && b ? `${a}.${b}` : null;
    isVariableDeclarator = (node) => node.type === "VariableDeclarator";
    isAssignmentExpression = (node) => node.type === "AssignmentExpression";
  }
});

// src/utils/createRule.ts
function interpolate(str, data) {
  return str.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data?.[key] ?? "");
}
function createRule(rule) {
  return {
    create(context) {
      const messages = context.settings?.playwright?.messages;
      if (!messages) {
        return rule.create(context);
      }
      const report = (options) => {
        if (messages && "messageId" in options) {
          const { data, messageId: messageId2, ...rest } = options;
          const message = messages?.[messageId2];
          return context.report(
            message ? { ...rest, message: interpolate(message, data) } : options
          );
        }
        return context.report(options);
      };
      const ruleContext = Object.freeze({
        ...context,
        cwd: context.cwd,
        filename: context.filename,
        id: context.id,
        options: context.options,
        parserOptions: context.parserOptions,
        parserPath: context.parserPath,
        physicalFilename: context.physicalFilename,
        report,
        settings: context.settings,
        sourceCode: context.sourceCode
      });
      return rule.create(ruleContext);
    },
    meta: rule.meta
  };
}
var init_createRule = __esm({
  "src/utils/createRule.ts"() {
    "use strict";
  }
});

// src/rules/expect-expect.ts
var expect_expect_default;
var init_expect_expect = __esm({
  "src/rules/expect-expect.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    expect_expect_default = createRule({
      create(context) {
        const options = {
          assertFunctionNames: [],
          ...context.options?.[0] ?? {}
        };
        const unchecked = [];
        function checkExpressions(nodes) {
          for (const node of nodes) {
            const index = node.type === "CallExpression" ? unchecked.indexOf(node) : -1;
            if (index !== -1) {
              unchecked.splice(index, 1);
              break;
            }
          }
        }
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type === "test") {
              unchecked.push(node);
            } else if (call?.type === "expect" || options.assertFunctionNames.find((name) => dig(node.callee, name))) {
              const ancestors = context.sourceCode.getAncestors(node);
              checkExpressions(ancestors);
            }
          },
          "Program:exit"() {
            unchecked.forEach((node) => {
              context.report({ messageId: "noAssertions", node });
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Enforce assertion to be made in a test body",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/expect-expect.md"
        },
        messages: {
          noAssertions: "Test has no assertions"
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              assertFunctionNames: {
                items: [{ type: "string" }],
                type: "array"
              }
            },
            type: "object"
          }
        ],
        type: "problem"
      }
    });
  }
});

// src/rules/max-expects.ts
var max_expects_default;
var init_max_expects = __esm({
  "src/rules/max-expects.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    max_expects_default = createRule({
      create(context) {
        const options = {
          max: 5,
          ...context.options?.[0] ?? {}
        };
        let count = 0;
        const maybeResetCount = (node) => {
          const parent = getParent(node);
          const isTestFn = parent?.type !== "CallExpression" || isTypeOfFnCall(context, parent, ["test"]);
          if (isTestFn) {
            count = 0;
          }
        };
        return {
          ArrowFunctionExpression: maybeResetCount,
          "ArrowFunctionExpression:exit": maybeResetCount,
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect" || getParent(call.head.node)?.type === "MemberExpression") {
              return;
            }
            count += 1;
            if (count > options.max) {
              context.report({
                data: {
                  count: count.toString(),
                  max: options.max.toString()
                },
                messageId: "exceededMaxAssertion",
                node
              });
            }
          },
          FunctionExpression: maybeResetCount,
          "FunctionExpression:exit": maybeResetCount
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Enforces a maximum number assertion calls in a test body",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/max-expects.md"
        },
        messages: {
          exceededMaxAssertion: "Too many assertion calls ({{ count }}) - maximum allowed is {{ max }}"
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              max: {
                minimum: 1,
                type: "integer"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/max-nested-describe.ts
var max_nested_describe_default;
var init_max_nested_describe = __esm({
  "src/rules/max-nested-describe.ts"() {
    "use strict";
    init_createRule();
    init_parseFnCall();
    max_nested_describe_default = createRule({
      create(context) {
        const { options } = context;
        const max = options[0]?.max ?? 5;
        const describes = [];
        return {
          CallExpression(node) {
            if (isTypeOfFnCall(context, node, ["describe"])) {
              describes.unshift(node);
              if (describes.length > max) {
                context.report({
                  data: {
                    depth: describes.length.toString(),
                    max: max.toString()
                  },
                  messageId: "exceededMaxDepth",
                  node: node.callee
                });
              }
            }
          },
          "CallExpression:exit"(node) {
            if (describes[0] === node) {
              describes.shift();
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Enforces a maximum depth to nested describe calls",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/max-nested-describe.md"
        },
        messages: {
          exceededMaxDepth: "Maximum describe call depth exceeded ({{ depth }}). Maximum allowed is {{ max }}."
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              max: {
                minimum: 0,
                type: "integer"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/missing-playwright-await.ts
function getReportNode(node) {
  const parent = getParent(node);
  return parent?.type === "MemberExpression" ? parent : node;
}
function getCallType(call, awaitableMatchers) {
  if (call.type === "step") {
    return { messageId: "testStep", node: call.head.node };
  }
  if (call.type === "expect") {
    const isPoll = call.modifiers.some((m) => getStringValue(m) === "poll");
    if (isPoll || awaitableMatchers.has(call.matcherName)) {
      return {
        data: { matcherName: call.matcherName },
        messageId: isPoll ? "expectPoll" : "expect",
        node: call.head.node
      };
    }
  }
}
var validTypes, expectPlaywrightMatchers, playwrightTestMatchers, missing_playwright_await_default;
var init_missing_playwright_await = __esm({
  "src/rules/missing-playwright-await.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    validTypes = /* @__PURE__ */ new Set([
      "AwaitExpression",
      "ReturnStatement",
      "ArrowFunctionExpression"
    ]);
    expectPlaywrightMatchers = [
      "toBeChecked",
      "toBeDisabled",
      "toBeEnabled",
      "toEqualText",
      // deprecated
      "toEqualUrl",
      "toEqualValue",
      "toHaveFocus",
      "toHaveSelector",
      "toHaveSelectorCount",
      "toHaveText",
      // deprecated
      "toMatchAttribute",
      "toMatchComputedStyle",
      "toMatchText",
      "toMatchTitle",
      "toMatchURL",
      "toMatchValue",
      "toPass"
    ];
    playwrightTestMatchers = [
      "toBeChecked",
      "toBeDisabled",
      "toBeEditable",
      "toBeEmpty",
      "toBeEnabled",
      "toBeFocused",
      "toBeHidden",
      "toBeVisible",
      "toContainText",
      "toHaveAttribute",
      "toHaveClass",
      "toHaveCount",
      "toHaveCSS",
      "toHaveId",
      "toHaveJSProperty",
      "toBeOK",
      "toHaveScreenshot",
      "toHaveText",
      "toHaveTitle",
      "toHaveURL",
      "toHaveValue",
      "toHaveValues",
      "toBeAttached",
      "toBeInViewport"
    ];
    missing_playwright_await_default = createRule({
      create(context) {
        const options = context.options[0] || {};
        const awaitableMatchers = /* @__PURE__ */ new Set([
          ...expectPlaywrightMatchers,
          ...playwrightTestMatchers,
          // Add any custom matchers to the set
          ...options.customMatchers || []
        ]);
        function checkValidity(node) {
          const parent = getParent(node);
          if (!parent)
            return false;
          if (validTypes.has(parent.type))
            return true;
          if (parent.type === "ArrayExpression") {
            return checkValidity(parent);
          }
          if (parent.type === "CallExpression" && parent.callee.type === "MemberExpression" && isIdentifier(parent.callee.object, "Promise") && isIdentifier(parent.callee.property, "all")) {
            return true;
          }
          if (parent.type === "VariableDeclarator") {
            const scope = context.sourceCode.getScope(parent.parent);
            for (const ref of scope.references) {
              const refParent = ref.identifier.parent;
              if (validTypes.has(refParent.type))
                return true;
              if (checkValidity(refParent))
                return true;
            }
          }
          return false;
        }
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "step" && call?.type !== "expect")
              return;
            const result = getCallType(call, awaitableMatchers);
            const isValid = result ? checkValidity(node) : false;
            if (result && !isValid) {
              context.report({
                data: result.data,
                fix: (fixer) => fixer.insertTextBefore(node, "await "),
                messageId: result.messageId,
                node: getReportNode(result.node)
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: `Identify false positives when async Playwright APIs are not properly awaited.`,
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/missing-playwright-await.md"
        },
        fixable: "code",
        messages: {
          expect: "'{{matcherName}}' must be awaited or returned.",
          expectPoll: "'expect.poll' matchers must be awaited or returned.",
          testStep: "'test.step' must be awaited or returned."
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              customMatchers: {
                items: { type: "string" },
                type: "array"
              }
            },
            type: "object"
          }
        ],
        type: "problem"
      }
    });
  }
});

// src/rules/no-commented-out-tests.ts
function getTestNames(context) {
  const aliases = context.settings.playwright?.globalAliases?.test ?? [];
  return ["test", ...aliases];
}
function hasTests(context, node) {
  const testNames = getTestNames(context);
  const names = testNames.join("|");
  const regex = new RegExp(
    `^\\s*(${names}|describe)(\\.\\w+|\\[['"]\\w+['"]\\])?\\s*\\(`,
    "mu"
  );
  return regex.test(node.value);
}
var no_commented_out_tests_default;
var init_no_commented_out_tests = __esm({
  "src/rules/no-commented-out-tests.ts"() {
    "use strict";
    init_createRule();
    no_commented_out_tests_default = createRule({
      create(context) {
        function checkNode(node) {
          if (!hasTests(context, node))
            return;
          context.report({
            messageId: "commentedTests",
            node
          });
        }
        return {
          Program() {
            context.sourceCode.getAllComments().forEach(checkNode);
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow commented out tests",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-commented-out-tests.md"
        },
        messages: {
          commentedTests: "Some tests seem to be commented"
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-conditional-expect.ts
var isCatchCall, getTestCallExpressionsFromDeclaredVariables, no_conditional_expect_default;
var init_no_conditional_expect = __esm({
  "src/rules/no-conditional-expect.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    isCatchCall = (node) => node.callee.type === "MemberExpression" && isPropertyAccessor(node.callee, "catch");
    getTestCallExpressionsFromDeclaredVariables = (context, declaredVariables) => {
      return declaredVariables.reduce(
        (acc, { references }) => [
          ...acc,
          ...references.map(({ identifier }) => getParent(identifier)).filter(
            // ESLint types are infurating
            (node) => node?.type === "CallExpression" && isTypeOfFnCall(context, node, ["test"])
          )
        ],
        []
      );
    };
    no_conditional_expect_default = createRule({
      create(context) {
        let conditionalDepth = 0;
        let inTestCase = false;
        let inPromiseCatch = false;
        const increaseConditionalDepth = () => inTestCase && conditionalDepth++;
        const decreaseConditionalDepth = () => inTestCase && conditionalDepth--;
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type === "test") {
              inTestCase = true;
            }
            if (isCatchCall(node)) {
              inPromiseCatch = true;
            }
            if (inTestCase && call?.type === "expect" && conditionalDepth > 0) {
              context.report({
                messageId: "conditionalExpect",
                node
              });
            }
            if (inPromiseCatch && call?.type === "expect") {
              context.report({
                messageId: "conditionalExpect",
                node
              });
            }
          },
          "CallExpression:exit"(node) {
            if (isTypeOfFnCall(context, node, ["test"])) {
              inTestCase = false;
            }
            if (isCatchCall(node)) {
              inPromiseCatch = false;
            }
          },
          CatchClause: increaseConditionalDepth,
          "CatchClause:exit": decreaseConditionalDepth,
          ConditionalExpression: increaseConditionalDepth,
          "ConditionalExpression:exit": decreaseConditionalDepth,
          FunctionDeclaration(node) {
            const declaredVariables = context.sourceCode.getDeclaredVariables(node);
            const testCallExpressions = getTestCallExpressionsFromDeclaredVariables(
              context,
              declaredVariables
            );
            if (testCallExpressions.length > 0) {
              inTestCase = true;
            }
          },
          IfStatement: increaseConditionalDepth,
          "IfStatement:exit": decreaseConditionalDepth,
          LogicalExpression: increaseConditionalDepth,
          "LogicalExpression:exit": decreaseConditionalDepth,
          SwitchStatement: increaseConditionalDepth,
          "SwitchStatement:exit": decreaseConditionalDepth
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow calling `expect` conditionally",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-conditional-expect.md"
        },
        messages: {
          conditionalExpect: "Avoid calling `expect` conditionally`"
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-conditional-in-test.ts
var no_conditional_in_test_default;
var init_no_conditional_in_test = __esm({
  "src/rules/no-conditional-in-test.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    no_conditional_in_test_default = createRule({
      create(context) {
        function checkConditional(node) {
          const call = findParent(node, "CallExpression");
          if (!call)
            return;
          if (isTypeOfFnCall(context, call, ["test", "step"])) {
            context.report({ messageId: "conditionalInTest", node });
          }
        }
        return {
          ConditionalExpression: checkConditional,
          IfStatement: checkConditional,
          LogicalExpression: checkConditional,
          SwitchStatement: checkConditional
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow conditional logic in tests",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-conditional-in-test.md"
        },
        messages: {
          conditionalInTest: "Avoid having conditionals in tests"
        },
        schema: [],
        type: "problem"
      }
    });
  }
});

// src/rules/no-duplicate-hooks.ts
var no_duplicate_hooks_default;
var init_no_duplicate_hooks = __esm({
  "src/rules/no-duplicate-hooks.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    no_duplicate_hooks_default = createRule({
      create(context) {
        const hookContexts = [{}];
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (!call)
              return;
            if (call.type === "describe") {
              hookContexts.push({});
            }
            if (call.type !== "hook") {
              return;
            }
            const currentLayer = hookContexts[hookContexts.length - 1];
            const name = node.callee.type === "MemberExpression" ? getStringValue(node.callee.property) : "";
            currentLayer[name] || (currentLayer[name] = 0);
            currentLayer[name] += 1;
            if (currentLayer[name] > 1) {
              context.report({
                data: { hook: name },
                messageId: "noDuplicateHook",
                node
              });
            }
          },
          "CallExpression:exit"(node) {
            if (isTypeOfFnCall(context, node, ["describe"])) {
              hookContexts.pop();
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow duplicate setup and teardown hooks",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-duplicate-hooks.md"
        },
        messages: {
          noDuplicateHook: "Duplicate {{ hook }} in describe block"
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-element-handle.ts
function getPropertyRange(node) {
  return node.type === "Identifier" ? node.range : [node.range[0] + 1, node.range[1] - 1];
}
var no_element_handle_default;
var init_no_element_handle = __esm({
  "src/rules/no-element-handle.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_element_handle_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (isPageMethod(node, "$") || isPageMethod(node, "$$")) {
              context.report({
                messageId: "noElementHandle",
                node: node.callee,
                suggest: [
                  {
                    fix: (fixer) => {
                      const { property } = node.callee;
                      const fixes = [
                        fixer.replaceTextRange(
                          getPropertyRange(property),
                          "locator"
                        )
                      ];
                      if (node.parent.type === "AwaitExpression") {
                        fixes.push(
                          fixer.removeRange([
                            node.parent.range[0],
                            node.range[0]
                          ])
                        );
                      }
                      return fixes;
                    },
                    messageId: isPageMethod(node, "$") ? "replaceElementHandleWithLocator" : "replaceElementHandlesWithLocator"
                  }
                ]
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "The use of ElementHandle is discouraged, use Locator instead",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-element-handle.md"
        },
        hasSuggestions: true,
        messages: {
          noElementHandle: "Unexpected use of element handles.",
          replaceElementHandlesWithLocator: "Replace `page.$$` with `page.locator`",
          replaceElementHandleWithLocator: "Replace `page.$` with `page.locator`"
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-eval.ts
var no_eval_default;
var init_no_eval = __esm({
  "src/rules/no-eval.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_eval_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const isEval = isPageMethod(node, "$eval");
            if (isEval || isPageMethod(node, "$$eval")) {
              context.report({
                messageId: isEval ? "noEval" : "noEvalAll",
                node: node.callee
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "The use of `page.$eval` and `page.$$eval` are discouraged, use `locator.evaluate` or `locator.evaluateAll` instead",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-eval.md"
        },
        messages: {
          noEval: "Unexpected use of page.$eval().",
          noEvalAll: "Unexpected use of page.$$eval()."
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-focused-test.ts
var no_focused_test_default;
var init_no_focused_test = __esm({
  "src/rules/no-focused-test.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    no_focused_test_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "test" && call?.type !== "describe") {
              return;
            }
            const onlyNode = call.members.find((s) => getStringValue(s) === "only");
            if (!onlyNode)
              return;
            context.report({
              messageId: "noFocusedTest",
              node: onlyNode,
              suggest: [
                {
                  fix: (fixer) => {
                    return fixer.removeRange([
                      onlyNode.range[0] - 1,
                      onlyNode.range[1] + Number(onlyNode.type !== "Identifier")
                    ]);
                  },
                  messageId: "suggestRemoveOnly"
                }
              ]
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "Prevent usage of `.only()` focus test annotation",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-focused-test.md"
        },
        hasSuggestions: true,
        messages: {
          noFocusedTest: "Unexpected focused test.",
          suggestRemoveOnly: "Remove .only() annotation."
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-force-option.ts
function isForceOptionEnabled(node) {
  const arg = node.arguments.at(-1);
  return arg?.type === "ObjectExpression" && arg.properties.find(
    (property) => property.type === "Property" && getStringValue(property.key) === "force" && isBooleanLiteral(property.value, true)
  );
}
var methodsWithForceOption, no_force_option_default;
var init_no_force_option = __esm({
  "src/rules/no-force-option.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    methodsWithForceOption = /* @__PURE__ */ new Set([
      "check",
      "uncheck",
      "click",
      "dblclick",
      "dragTo",
      "fill",
      "hover",
      "selectOption",
      "selectText",
      "setChecked",
      "tap"
    ]);
    no_force_option_default = createRule({
      create(context) {
        return {
          MemberExpression(node) {
            if (methodsWithForceOption.has(getStringValue(node.property)) && node.parent.type === "CallExpression") {
              const reportNode = isForceOptionEnabled(node.parent);
              if (reportNode) {
                context.report({ messageId: "noForceOption", node: reportNode });
              }
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Prevent usage of `{ force: true }` option.",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-force-option.md"
        },
        messages: {
          noForceOption: "Unexpected use of { force: true } option."
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-get-by-title.ts
var no_get_by_title_default;
var init_no_get_by_title = __esm({
  "src/rules/no-get-by-title.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_get_by_title_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (isPageMethod(node, "getByTitle")) {
              context.report({ messageId: "noGetByTitle", node });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallows the usage of getByTitle()",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-get-by-title.md"
        },
        messages: {
          noGetByTitle: "The HTML title attribute is not an accessible name. Prefer getByRole() or getByLabelText() instead."
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-hooks.ts
var no_hooks_default;
var init_no_hooks = __esm({
  "src/rules/no-hooks.ts"() {
    "use strict";
    init_createRule();
    init_parseFnCall();
    no_hooks_default = createRule({
      create(context) {
        const options = {
          allow: [],
          ...context.options?.[0] ?? {}
        };
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (!call)
              return;
            if (call.type === "hook" && !options.allow.includes(call.name)) {
              context.report({
                data: { hookName: call.name },
                messageId: "unexpectedHook",
                node
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow setup and teardown hooks",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-hooks.md"
        },
        messages: {
          unexpectedHook: "Unexpected '{{ hookName }}' hook"
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              allow: {
                contains: ["beforeAll", "beforeEach", "afterAll", "afterEach"],
                type: "array"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-nested-step.ts
function isStepCall(node) {
  const inner = node.type === "CallExpression" ? node.callee : node;
  if (inner.type !== "MemberExpression") {
    return false;
  }
  return isPropertyAccessor(inner, "step");
}
var no_nested_step_default;
var init_no_nested_step = __esm({
  "src/rules/no-nested-step.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_nested_step_default = createRule({
      create(context) {
        const stack = [];
        function pushStepCallback(node) {
          if (node.parent.type !== "CallExpression" || !isStepCall(node.parent)) {
            return;
          }
          stack.push(0);
          if (stack.length > 1) {
            context.report({
              messageId: "noNestedStep",
              node: node.parent.callee
            });
          }
        }
        function popStepCallback(node) {
          const { parent } = node;
          if (parent.type === "CallExpression" && isStepCall(parent)) {
            stack.pop();
          }
        }
        return {
          ArrowFunctionExpression: pushStepCallback,
          "ArrowFunctionExpression:exit": popStepCallback,
          FunctionExpression: pushStepCallback,
          "FunctionExpression:exit": popStepCallback
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow nested `test.step()` methods",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-nested-step.md"
        },
        messages: {
          noNestedStep: "Do not nest `test.step()` methods."
        },
        schema: [],
        type: "problem"
      }
    });
  }
});

// src/rules/no-networkidle.ts
var messageId, methods, no_networkidle_default;
var init_no_networkidle = __esm({
  "src/rules/no-networkidle.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    messageId = "noNetworkidle";
    methods = /* @__PURE__ */ new Set([
      "goBack",
      "goForward",
      "goto",
      "reload",
      "setContent",
      "waitForLoadState",
      "waitForURL"
    ]);
    no_networkidle_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.type !== "MemberExpression")
              return;
            const methodName = getStringValue(node.callee.property);
            if (!methods.has(methodName))
              return;
            if (methodName === "waitForLoadState") {
              const arg = node.arguments[0];
              if (arg && isStringLiteral(arg, "networkidle")) {
                context.report({ messageId, node: arg });
              }
              return;
            }
            if (node.arguments.length >= 2) {
              const [_, arg] = node.arguments;
              if (arg.type !== "ObjectExpression")
                return;
              const property = arg.properties.filter((p) => p.type === "Property").find((p) => isStringLiteral(p.value, "networkidle"));
              if (property) {
                context.report({ messageId, node: property.value });
              }
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "Prevent usage of the networkidle option",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-networkidle.md"
        },
        messages: {
          noNetworkidle: "Unexpected use of networkidle."
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-nth-methods.ts
var methods2, no_nth_methods_default;
var init_no_nth_methods = __esm({
  "src/rules/no-nth-methods.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    methods2 = /* @__PURE__ */ new Set(["first", "last", "nth"]);
    no_nth_methods_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.type !== "MemberExpression")
              return;
            const method = getStringValue(node.callee.property);
            if (!methods2.has(method))
              return;
            context.report({
              data: { method },
              loc: {
                end: node.loc.end,
                start: node.callee.property.loc.start
              },
              messageId: "noNthMethod"
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow usage of nth methods",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-nth-methods.md"
        },
        messages: {
          noNthMethod: "Unexpected use of {{method}}()"
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-page-pause.ts
var no_page_pause_default;
var init_no_page_pause = __esm({
  "src/rules/no-page-pause.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_page_pause_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (isPageMethod(node, "pause")) {
              context.report({ messageId: "noPagePause", node });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "Prevent usage of page.pause()",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-page-pause.md"
        },
        messages: {
          noPagePause: "Unexpected use of page.pause()."
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-raw-locators.ts
function normalize(str) {
  const match = /\[([^=]+?)=['"]?([^'"]+?)['"]?\]/.exec(str);
  return match ? `[${match[1]}=${match[2]}]` : str;
}
var no_raw_locators_default;
var init_no_raw_locators = __esm({
  "src/rules/no-raw-locators.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_raw_locators_default = createRule({
      create(context) {
        const options = {
          allowed: [],
          ...context.options?.[0] ?? {}
        };
        function isAllowed(arg) {
          return options.allowed.some((a) => normalize(a) === normalize(arg));
        }
        return {
          CallExpression(node) {
            if (node.callee.type !== "MemberExpression")
              return;
            const method = getStringValue(node.callee.property);
            const arg = getStringValue(node.arguments[0]);
            const isLocator = isPageMethod(node, "locator") || method === "locator";
            if (isLocator && !isAllowed(arg)) {
              context.report({ messageId: "noRawLocator", node });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallows the usage of raw locators",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-raw-locators.md"
        },
        messages: {
          noRawLocator: "Usage of raw locator detected. Use methods like .getByRole() or .getByText() instead of raw locators."
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              allowed: {
                items: { type: "string" },
                type: "array"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-restricted-matchers.ts
var no_restricted_matchers_default;
var init_no_restricted_matchers = __esm({
  "src/rules/no-restricted-matchers.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    no_restricted_matchers_default = createRule({
      create(context) {
        const restrictedChains = context.options?.[0] ?? {};
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect")
              return;
            Object.entries(restrictedChains).map(([restriction, message]) => {
              const chain = call.members;
              const restrictionLinks = restriction.split(".").length;
              const startIndex = chain.findIndex((_, i) => {
                const partial = chain.slice(i, i + restrictionLinks).map(getStringValue).join(".");
                return partial === restriction;
              });
              return {
                // If the restriction chain was found, return the portion of the
                // chain that matches the restriction chain.
                chain: startIndex !== -1 ? chain.slice(startIndex, startIndex + restrictionLinks) : [],
                message,
                restriction
              };
            }).filter(({ chain }) => chain.length).forEach(({ chain, message, restriction }) => {
              context.report({
                data: { message: message ?? "", restriction },
                loc: {
                  end: chain.at(-1).loc.end,
                  start: chain[0].loc.start
                },
                messageId: message ? "restrictedWithMessage" : "restricted"
              });
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow specific matchers & modifiers",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-restricted-matchers.md"
        },
        messages: {
          restricted: "Use of `{{restriction}}` is disallowed",
          restrictedWithMessage: "{{message}}"
        },
        schema: [
          {
            additionalProperties: {
              type: ["string", "null"]
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-skipped-test.ts
var no_skipped_test_default;
var init_no_skipped_test = __esm({
  "src/rules/no-skipped-test.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    no_skipped_test_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const options = context.options[0] || {};
            const allowConditional = !!options.allowConditional;
            const call = parseFnCall(context, node);
            if (call?.group !== "test" && call?.group !== "describe") {
              return;
            }
            const skipNode = call.members.find((s) => getStringValue(s) === "skip");
            if (!skipNode)
              return;
            const isStandalone = call.type === "config";
            if (isStandalone && allowConditional) {
              return;
            }
            context.report({
              messageId: "noSkippedTest",
              node: isStandalone ? node : skipNode,
              suggest: [
                {
                  fix: (fixer) => {
                    return isStandalone ? fixer.remove(node.parent) : fixer.removeRange([
                      skipNode.range[0] - 1,
                      skipNode.range[1] + Number(skipNode.type !== "Identifier")
                    ]);
                  },
                  messageId: "removeSkippedTestAnnotation"
                }
              ]
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Prevent usage of the `.skip()` skip test annotation.",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-skipped-test.md"
        },
        hasSuggestions: true,
        messages: {
          noSkippedTest: "Unexpected use of the `.skip()` annotation.",
          removeSkippedTestAnnotation: "Remove the `.skip()` annotation."
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              allowConditional: {
                default: false,
                type: "boolean"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-standalone-expect.ts
var getBlockType, no_standalone_expect_default;
var init_no_standalone_expect = __esm({
  "src/rules/no-standalone-expect.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    getBlockType = (context, statement) => {
      const func = getParent(statement);
      if (!func) {
        throw new Error(
          `Unexpected BlockStatement. No parent defined. - please file a github issue at https://github.com/playwright-community/eslint-plugin-playwright`
        );
      }
      if (func.type === "FunctionDeclaration") {
        return "function";
      }
      if (isFunction(func) && func.parent) {
        const expr = func.parent;
        if (expr.type === "VariableDeclarator" || expr.type === "MethodDefinition") {
          return "function";
        }
        if (expr.type === "CallExpression" && isTypeOfFnCall(context, expr, ["describe"])) {
          return "describe";
        }
      }
      return null;
    };
    no_standalone_expect_default = createRule({
      create(context) {
        const callStack = [];
        return {
          ArrowFunctionExpression(node) {
            if (node.parent?.type !== "CallExpression") {
              callStack.push("arrow");
            }
          },
          "ArrowFunctionExpression:exit"() {
            if (callStack.at(-1) === "arrow") {
              callStack.pop();
            }
          },
          BlockStatement(statement) {
            const blockType = getBlockType(context, statement);
            if (blockType) {
              callStack.push(blockType);
            }
          },
          "BlockStatement:exit"(statement) {
            if (callStack.at(-1) === getBlockType(context, statement)) {
              callStack.pop();
            }
          },
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type === "expect") {
              if (getParent(call.head.node)?.type === "MemberExpression" && call.members.length === 1) {
                return;
              }
              const parent = callStack.at(-1);
              if (!parent || parent === "describe") {
                context.report({ messageId: "unexpectedExpect", node });
              }
              return;
            }
            if (call?.type === "test") {
              callStack.push("test");
            }
            if (call?.type === "hook") {
              callStack.push("hook");
            }
            if (node.callee.type === "TaggedTemplateExpression") {
              callStack.push("template");
            }
          },
          "CallExpression:exit"(node) {
            const top = callStack.at(-1);
            if (top === "test" && isTypeOfFnCall(context, node, ["test"]) && node.callee.type !== "MemberExpression" || top === "template" && node.callee.type === "TaggedTemplateExpression") {
              callStack.pop();
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Disallow using `expect` outside of `test` blocks",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-standalone-expect.md"
        },
        fixable: "code",
        messages: {
          unexpectedExpect: "Expect must be inside of a test block"
        },
        type: "suggestion"
      }
    });
  }
});

// src/utils/misc.ts
var getAmountData, truthy;
var init_misc = __esm({
  "src/utils/misc.ts"() {
    "use strict";
    getAmountData = (amount) => ({
      amount: amount.toString(),
      s: amount === 1 ? "" : "s"
    });
    truthy = Boolean;
  }
});

// src/rules/no-unsafe-references.ts
function collectVariables(scope) {
  if (!scope || scope.type === "global")
    return [];
  return [
    ...collectVariables(scope.upper),
    ...scope.variables.map((ref) => ref.name)
  ];
}
function addArgument(fixer, node, refs) {
  if (!node.arguments.length)
    return;
  if (node.arguments.length === 1) {
    return fixer.insertTextAfter(node.arguments[0], `, [${refs}]`);
  }
  const arg = node.arguments.at(-1);
  if (!arg)
    return;
  if (arg.type !== "ArrayExpression") {
    return fixer.replaceText(arg, `[${getStringValue(arg)}, ${refs}]`);
  }
  const lastItem = arg.elements.at(-1);
  return lastItem ? fixer.insertTextAfter(lastItem, `, ${refs}`) : fixer.replaceText(arg, `[${refs}]`);
}
function getParen(context, node) {
  let token = context.sourceCode.getFirstToken(node);
  while (token && token.value !== "(") {
    token = context.sourceCode.getTokenAfter(token);
  }
  return token;
}
function addParam(context, fixer, node, refs) {
  const lastParam = node.params.at(-1);
  if (lastParam) {
    return lastParam.type === "ArrayPattern" ? fixer.insertTextAfter(lastParam.elements.at(-1), `, ${refs}`) : fixer.replaceText(lastParam, `[${getStringValue(lastParam)}, ${refs}]`);
  }
  const token = getParen(context, node);
  return token ? fixer.insertTextAfter(token, `[${refs}]`) : null;
}
var no_unsafe_references_default;
var init_no_unsafe_references = __esm({
  "src/rules/no-unsafe-references.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_misc();
    no_unsafe_references_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (!isPageMethod(node, "evaluate"))
              return;
            const [fn] = node.arguments;
            if (!fn || !isFunction(fn))
              return;
            const { through, upper } = context.sourceCode.getScope(fn.body);
            const allRefs = new Set(collectVariables(upper));
            through.filter((ref) => {
              const parent = getParent(ref.identifier);
              return parent?.type !== "TSTypeReference";
            }).filter((ref) => allRefs.has(ref.identifier.name)).forEach((ref, i, arr) => {
              const descriptor = {
                data: { variable: ref.identifier.name },
                messageId: "noUnsafeReference",
                node: ref.identifier
              };
              if (i !== 0) {
                context.report(descriptor);
                return;
              }
              context.report({
                ...descriptor,
                fix(fixer) {
                  const refs = arr.map((ref2) => ref2.identifier.name).join(", ");
                  return [
                    addArgument(fixer, node, refs),
                    addParam(context, fixer, fn, refs)
                  ].filter(truthy);
                }
              });
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "Prevent unsafe variable references in page.evaluate()",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-unsafe-references.md"
        },
        fixable: "code",
        messages: {
          noUnsafeReference: 'Unsafe reference to variable "{{ variable }}" in page.evaluate()'
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-useless-await.ts
function isSupportedMethod(node) {
  if (node.callee.type !== "MemberExpression")
    return false;
  const name = getStringValue(node.callee.property);
  return locatorMethods.has(name) || pageMethods.has(name) && isPageMethod(node, name);
}
var locatorMethods, pageMethods, no_useless_await_default;
var init_no_useless_await = __esm({
  "src/rules/no-useless-await.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    locatorMethods = /* @__PURE__ */ new Set([
      "and",
      "first",
      "getByAltText",
      "getByLabel",
      "getByPlaceholder",
      "getByRole",
      "getByTestId",
      "getByText",
      "getByTitle",
      "last",
      "locator",
      "nth",
      "or"
    ]);
    pageMethods = /* @__PURE__ */ new Set([
      "childFrames",
      "frame",
      "frameLocator",
      "frames",
      "isClosed",
      "isDetached",
      "mainFrame",
      "name",
      "on",
      "page",
      "parentFrame",
      "setDefaultNavigationTimeout",
      "setDefaultTimeout",
      "url",
      "video",
      "viewportSize",
      "workers"
    ]);
    no_useless_await_default = createRule({
      create(context) {
        return {
          AwaitExpression(node) {
            if (node.argument.type !== "CallExpression")
              return;
            const { callee } = node.argument;
            if (callee.type !== "MemberExpression")
              return;
            if (!isSupportedMethod(node.argument))
              return;
            const start = node.loc.start;
            const range = node.range;
            context.report({
              fix: (fixer) => fixer.removeRange([range[0], range[0] + 6]),
              loc: {
                end: {
                  column: start.column + 5,
                  line: start.line
                },
                start
              },
              messageId: "noUselessAwait"
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "Disallow unnecessary awaits for Playwright methods",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-useless-await.md"
        },
        fixable: "code",
        messages: {
          noUselessAwait: "Unnecessary await expression. This method does not return a Promise."
        },
        type: "problem"
      }
    });
  }
});

// src/utils/fixer.ts
function replaceAccessorFixer(fixer, node, text) {
  const [start, end] = node.range;
  return fixer.replaceTextRange(
    [start + getRangeOffset(node), end - getRangeOffset(node)],
    text
  );
}
function removePropertyFixer(fixer, property) {
  const parent = getParent(property);
  if (parent?.type !== "ObjectExpression")
    return;
  if (parent.properties.length === 1) {
    return fixer.remove(parent);
  }
  const index = parent.properties.indexOf(property);
  const range = index ? [parent.properties[index - 1].range[1], property.range[1]] : [property.range[0], parent.properties[1].range[0]];
  return fixer.removeRange(range);
}
var getRangeOffset;
var init_fixer = __esm({
  "src/utils/fixer.ts"() {
    "use strict";
    init_ast();
    getRangeOffset = (node) => node.type === "Identifier" ? 0 : 1;
  }
});

// src/rules/no-useless-not.ts
function getOptions(call, name) {
  const [arg] = call.matcherArgs;
  if (arg?.type !== "ObjectExpression")
    return;
  const property = arg.properties.find(
    (p) => p.type === "Property" && getStringValue(p.key) === name && isBooleanLiteral(p.value)
  );
  return {
    arg,
    property,
    value: property?.value?.value
  };
}
var matcherConfig, no_useless_not_default;
var init_no_useless_not = __esm({
  "src/rules/no-useless-not.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_fixer();
    init_misc();
    init_parseFnCall();
    matcherConfig = {
      toBeDisabled: { inverse: "toBeEnabled" },
      toBeEnabled: {
        argName: "enabled",
        inverse: "toBeDisabled"
      },
      toBeHidden: { inverse: "toBeVisible" },
      toBeVisible: {
        argName: "visible",
        inverse: "toBeHidden"
      }
    };
    no_useless_not_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect")
              return;
            const config = matcherConfig[call.matcherName];
            if (!config)
              return;
            const options = config.argName ? getOptions(call, config.argName) : void 0;
            if (options?.arg && options.value === void 0)
              return;
            const notModifier = call.modifiers.find(
              (mod) => getStringValue(mod) === "not"
            );
            if (!notModifier && !options?.property)
              return;
            const isInverted = !!notModifier !== (options?.value === false);
            const newMatcherName = isInverted ? config.inverse : call.matcherName;
            context.report({
              data: {
                new: newMatcherName,
                old: call.matcherName,
                property: config.argName ?? ""
              },
              fix: (fixer) => {
                return [
                  // Remove the `not` modifier if it exists
                  notModifier && fixer.removeRange([
                    notModifier.range[0] - getRangeOffset(notModifier),
                    notModifier.range[1] + 1
                  ]),
                  // Remove the `visible` or `enabled` property if it exists
                  options?.property && removePropertyFixer(fixer, options.property),
                  // Swap the matcher name if it's different
                  call.matcherName !== newMatcherName && replaceAccessorFixer(fixer, call.matcher, newMatcherName)
                ].filter(truthy);
              },
              loc: notModifier ? { end: call.matcher.loc.end, start: notModifier.loc.start } : options.property.loc,
              messageId: notModifier ? "noUselessNot" : isInverted ? "noUselessProperty" : "noUselessTruthy"
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: `Disallow usage of 'not' matchers when a more specific matcher exists`,
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-useless-not.md"
        },
        fixable: "code",
        messages: {
          noUselessNot: "Unexpected usage of not.{{old}}(). Use {{new}}() instead.",
          noUselessProperty: "Unexpected usage of '{{old}}({ {{property}}: false })'. Use '{{new}}()' instead.",
          noUselessTruthy: "Unexpected usage of '{{old}}({ {{property}}: true })'. Use '{{new}}()' instead."
        },
        type: "problem"
      }
    });
  }
});

// src/rules/no-wait-for-selector.ts
var no_wait_for_selector_default;
var init_no_wait_for_selector = __esm({
  "src/rules/no-wait-for-selector.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_wait_for_selector_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (isPageMethod(node, "waitForSelector")) {
              context.report({
                messageId: "noWaitForSelector",
                node,
                suggest: [
                  {
                    fix: (fixer) => fixer.remove(
                      node.parent && node.parent.type !== "AwaitExpression" ? node.parent : node.parent.parent
                    ),
                    messageId: "removeWaitForSelector"
                  }
                ]
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Prevent usage of page.waitForSelector()",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-wait-for-selector.md"
        },
        hasSuggestions: true,
        messages: {
          noWaitForSelector: "Unexpected use of page.waitForSelector().",
          removeWaitForSelector: "Remove the page.waitForSelector() method."
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/no-wait-for-timeout.ts
var no_wait_for_timeout_default;
var init_no_wait_for_timeout = __esm({
  "src/rules/no-wait-for-timeout.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    no_wait_for_timeout_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            if (isPageMethod(node, "waitForTimeout")) {
              context.report({
                messageId: "noWaitForTimeout",
                node,
                suggest: [
                  {
                    fix: (fixer) => fixer.remove(
                      node.parent && node.parent.type !== "AwaitExpression" ? node.parent : node.parent.parent
                    ),
                    messageId: "removeWaitForTimeout"
                  }
                ]
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Prevent usage of page.waitForTimeout()",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/no-wait-for-timeout.md"
        },
        hasSuggestions: true,
        messages: {
          noWaitForTimeout: "Unexpected use of page.waitForTimeout().",
          removeWaitForTimeout: "Remove the page.waitForTimeout() method."
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-comparison-matcher.ts
var isString, isComparingToString, invertedOperators, operatorMatcher, determineMatcher, prefer_comparison_matcher_default;
var init_prefer_comparison_matcher = __esm({
  "src/rules/prefer-comparison-matcher.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    isString = (node) => {
      return isStringLiteral(node) || node.type === "TemplateLiteral";
    };
    isComparingToString = (expression) => {
      return isString(expression.left) || isString(expression.right);
    };
    invertedOperators = {
      "<": ">=",
      "<=": ">",
      ">": "<=",
      ">=": "<"
    };
    operatorMatcher = {
      "<": "toBeLessThan",
      "<=": "toBeLessThanOrEqual",
      ">": "toBeGreaterThan",
      ">=": "toBeGreaterThanOrEqual"
    };
    determineMatcher = (operator, negated) => {
      const op = negated ? invertedOperators[operator] : operator;
      return operatorMatcher[op] ?? null;
    };
    prefer_comparison_matcher_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect" || call.matcherArgs.length === 0)
              return;
            const expect = getParent(call.head.node);
            if (expect?.type !== "CallExpression")
              return;
            const [comparison] = expect.arguments;
            const expectCallEnd = expect.range[1];
            const [matcherArg] = call.matcherArgs;
            if (comparison?.type !== "BinaryExpression" || isComparingToString(comparison) || !equalityMatchers.has(call.matcherName) || !isBooleanLiteral(matcherArg)) {
              return;
            }
            const hasNot = call.modifiers.some(
              (node2) => getStringValue(node2) === "not"
            );
            const preferredMatcher = determineMatcher(
              comparison.operator,
              getRawValue(matcherArg) === hasNot.toString()
            );
            if (!preferredMatcher) {
              return;
            }
            context.report({
              data: { preferredMatcher },
              fix(fixer) {
                const [modifier] = call.modifiers;
                const modifierText = modifier && getStringValue(modifier) !== "not" ? `.${getStringValue(modifier)}` : "";
                return [
                  // Replace the comparison argument with the left-hand side of the comparison
                  fixer.replaceText(
                    comparison,
                    context.sourceCode.getText(comparison.left)
                  ),
                  // Replace the current matcher & modifier with the preferred matcher
                  fixer.replaceTextRange(
                    [expectCallEnd, getParent(call.matcher).range[1]],
                    `${modifierText}.${preferredMatcher}`
                  ),
                  // Replace the matcher argument with the right-hand side of the comparison
                  fixer.replaceText(
                    matcherArg,
                    context.sourceCode.getText(comparison.right)
                  )
                ];
              },
              messageId: "useToBeComparison",
              node: call.matcher
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest using the built-in comparison matchers",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-comparision-matcher.md"
        },
        fixable: "code",
        messages: {
          useToBeComparison: "Prefer using `{{ preferredMatcher }}` instead"
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-equality-matcher.ts
var prefer_equality_matcher_default;
var init_prefer_equality_matcher = __esm({
  "src/rules/prefer-equality-matcher.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    prefer_equality_matcher_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect" || call.matcherArgs.length === 0)
              return;
            const expect = getParent(call.head.node);
            if (expect?.type !== "CallExpression")
              return;
            const [comparison] = expect.arguments;
            const expectCallEnd = expect.range[1];
            const [matcherArg] = call.matcherArgs;
            if (comparison?.type !== "BinaryExpression" || comparison.operator !== "===" && comparison.operator !== "!==" || !equalityMatchers.has(call.matcherName) || !isBooleanLiteral(matcherArg)) {
              return;
            }
            const matcherValue = getRawValue(matcherArg) === "true";
            const [modifier] = call.modifiers;
            const hasNot = call.modifiers.some(
              (node2) => getStringValue(node2) === "not"
            );
            const addNotModifier = (comparison.operator === "!==" ? !matcherValue : matcherValue) === hasNot;
            context.report({
              messageId: "useEqualityMatcher",
              node: call.matcher,
              suggest: [...equalityMatchers.keys()].map((equalityMatcher) => ({
                data: { matcher: equalityMatcher },
                fix(fixer) {
                  let modifierText = modifier && getStringValue(modifier) !== "not" ? `.${getStringValue(modifier)}` : "";
                  if (addNotModifier) {
                    modifierText += `.not`;
                  }
                  return [
                    // replace the comparison argument with the left-hand side of the comparison
                    fixer.replaceText(
                      comparison,
                      context.sourceCode.getText(comparison.left)
                    ),
                    // replace the current matcher & modifier with the preferred matcher
                    fixer.replaceTextRange(
                      [expectCallEnd, getParent(call.matcher).range[1]],
                      `${modifierText}.${equalityMatcher}`
                    ),
                    // replace the matcher argument with the right-hand side of the comparison
                    fixer.replaceText(
                      matcherArg,
                      context.sourceCode.getText(comparison.right)
                    )
                  ];
                },
                messageId: "suggestEqualityMatcher"
              }))
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest using the built-in equality matchers",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-equality-matcher.md"
        },
        hasSuggestions: true,
        messages: {
          suggestEqualityMatcher: "Use `{{ matcher }}`",
          useEqualityMatcher: "Prefer using one of the equality matchers instead"
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-hooks-in-order.ts
var order, prefer_hooks_in_order_default;
var init_prefer_hooks_in_order = __esm({
  "src/rules/prefer-hooks-in-order.ts"() {
    "use strict";
    init_createRule();
    init_parseFnCall();
    order = ["beforeAll", "beforeEach", "afterEach", "afterAll"];
    prefer_hooks_in_order_default = createRule({
      create(context) {
        let previousHookIndex = -1;
        let inHook = false;
        return {
          CallExpression(node) {
            if (inHook)
              return;
            const call = parseFnCall(context, node);
            if (call?.type !== "hook") {
              previousHookIndex = -1;
              return;
            }
            inHook = true;
            const currentHook = call.name;
            const currentHookIndex = order.indexOf(currentHook);
            if (currentHookIndex < previousHookIndex) {
              context.report({
                data: {
                  currentHook,
                  previousHook: order[previousHookIndex]
                },
                messageId: "reorderHooks",
                node
              });
              return;
            }
            previousHookIndex = currentHookIndex;
          },
          "CallExpression:exit"(node) {
            if (isTypeOfFnCall(context, node, ["hook"])) {
              inHook = false;
              return;
            }
            if (inHook)
              return;
            previousHookIndex = -1;
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Prefer having hooks in a consistent order",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-hooks-in-order.md"
        },
        messages: {
          reorderHooks: "`{{ currentHook }}` hooks should be before any `{{ previousHook }}` hooks"
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-hooks-on-top.ts
var prefer_hooks_on_top_default;
var init_prefer_hooks_on_top = __esm({
  "src/rules/prefer-hooks-on-top.ts"() {
    "use strict";
    init_createRule();
    init_parseFnCall();
    prefer_hooks_on_top_default = createRule({
      create(context) {
        const stack = [false];
        return {
          CallExpression(node) {
            if (isTypeOfFnCall(context, node, ["test"])) {
              stack[stack.length - 1] = true;
            }
            if (stack.at(-1) && isTypeOfFnCall(context, node, ["hook"])) {
              context.report({ messageId: "noHookOnTop", node });
            }
            stack.push(false);
          },
          "CallExpression:exit"() {
            stack.pop();
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest having hooks before any test cases",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-hooks-on-top.md"
        },
        messages: {
          noHookOnTop: "Hooks should come before test cases"
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-lowercase-title.ts
var prefer_lowercase_title_default;
var init_prefer_lowercase_title = __esm({
  "src/rules/prefer-lowercase-title.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    prefer_lowercase_title_default = createRule({
      create(context) {
        const { allowedPrefixes, ignore, ignoreTopLevelDescribe } = {
          allowedPrefixes: [],
          ignore: [],
          ignoreTopLevelDescribe: false,
          ...context.options?.[0] ?? {}
        };
        let describeCount = 0;
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "describe" && call?.type !== "test") {
              return;
            }
            if (call.type === "describe") {
              describeCount++;
              if (ignoreTopLevelDescribe && describeCount === 1) {
                return;
              }
            }
            const [title] = node.arguments;
            if (!isStringNode(title)) {
              return;
            }
            const description = getStringValue(title);
            if (!description || allowedPrefixes.some((name) => description.startsWith(name))) {
              return;
            }
            const method = call.type === "describe" ? "test.describe" : "test";
            const firstCharacter = description.charAt(0);
            if (!firstCharacter || firstCharacter === firstCharacter.toLowerCase() || ignore.includes(method)) {
              return;
            }
            context.report({
              data: { method },
              fix(fixer) {
                const rangeIgnoringQuotes = [
                  title.range[0] + 1,
                  title.range[1] - 1
                ];
                const newDescription = description.substring(0, 1).toLowerCase() + description.substring(1);
                return fixer.replaceTextRange(rangeIgnoringQuotes, newDescription);
              },
              messageId: "unexpectedLowercase",
              node: node.arguments[0]
            });
          },
          "CallExpression:exit"(node) {
            if (isTypeOfFnCall(context, node, ["describe"])) {
              describeCount--;
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Enforce lowercase test names",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-lowercase-title.md"
        },
        fixable: "code",
        messages: {
          unexpectedLowercase: "`{{method}}`s should begin with lowercase"
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              allowedPrefixes: {
                additionalItems: false,
                items: { type: "string" },
                type: "array"
              },
              ignore: {
                additionalItems: false,
                items: {
                  enum: ["test.describe", "test"]
                },
                type: "array"
              },
              ignoreTopLevelDescribe: {
                default: false,
                type: "boolean"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-strict-equal.ts
var prefer_strict_equal_default;
var init_prefer_strict_equal = __esm({
  "src/rules/prefer-strict-equal.ts"() {
    "use strict";
    init_createRule();
    init_fixer();
    init_parseFnCall();
    prefer_strict_equal_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect")
              return;
            if (call.matcherName === "toEqual") {
              context.report({
                messageId: "useToStrictEqual",
                node: call.matcher,
                suggest: [
                  {
                    fix: (fixer) => {
                      return replaceAccessorFixer(
                        fixer,
                        call.matcher,
                        "toStrictEqual"
                      );
                    },
                    messageId: "suggestReplaceWithStrictEqual"
                  }
                ]
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest using `toStrictEqual()`",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-strict-equal.md"
        },
        fixable: "code",
        hasSuggestions: true,
        messages: {
          suggestReplaceWithStrictEqual: "Replace with `toStrictEqual()`",
          useToStrictEqual: "Use toStrictEqual() instead"
        },
        schema: [],
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-to-be.ts
function shouldUseToBe(call) {
  let arg = call.matcherArgs[0];
  if (arg.type === "UnaryExpression" && arg.operator === "-") {
    arg = arg.argument;
  }
  if (arg.type === "Literal") {
    return !("regex" in arg);
  }
  return arg.type === "TemplateLiteral";
}
function reportPreferToBe(context, call, whatToBe, notModifier) {
  context.report({
    fix(fixer) {
      const fixes = [
        replaceAccessorFixer(fixer, call.matcher, `toBe${whatToBe}`)
      ];
      if (call.matcherArgs?.length && whatToBe !== "") {
        fixes.push(fixer.remove(call.matcherArgs[0]));
      }
      if (notModifier) {
        const [start, end] = notModifier.range;
        fixes.push(fixer.removeRange([start - 1, end]));
      }
      return fixes;
    },
    messageId: `useToBe${whatToBe}`,
    node: call.matcher
  });
}
var prefer_to_be_default;
var init_prefer_to_be = __esm({
  "src/rules/prefer-to-be.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_fixer();
    init_parseFnCall();
    prefer_to_be_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect")
              return;
            const notMatchers = ["toBeUndefined", "toBeDefined"];
            const notModifier = call.modifiers.find(
              (node2) => getStringValue(node2) === "not"
            );
            if (notModifier && notMatchers.includes(call.matcherName)) {
              return reportPreferToBe(
                context,
                call,
                call.matcherName === "toBeDefined" ? "Undefined" : "Defined",
                notModifier
              );
            }
            const firstArg = call.matcherArgs[0];
            if (!equalityMatchers.has(call.matcherName) || !firstArg) {
              return;
            }
            if (firstArg.type === "Literal" && firstArg.value === null) {
              return reportPreferToBe(context, call, "Null");
            }
            if (isIdentifier(firstArg, "undefined")) {
              const name = notModifier ? "Defined" : "Undefined";
              return reportPreferToBe(context, call, name, notModifier);
            }
            if (isIdentifier(firstArg, "NaN")) {
              return reportPreferToBe(context, call, "NaN");
            }
            if (shouldUseToBe(call) && call.matcherName !== "toBe") {
              reportPreferToBe(context, call, "");
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest using `toBe()` for primitive literals",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-be.md"
        },
        fixable: "code",
        messages: {
          useToBe: "Use `toBe` when expecting primitive literals",
          useToBeDefined: "Use `toBeDefined` instead",
          useToBeNaN: "Use `toBeNaN` instead",
          useToBeNull: "Use `toBeNull` instead",
          useToBeUndefined: "Use `toBeUndefined` instead"
        },
        schema: [],
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-to-contain.ts
var isFixableIncludesCallExpression, prefer_to_contain_default;
var init_prefer_to_contain = __esm({
  "src/rules/prefer-to-contain.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    isFixableIncludesCallExpression = (node) => node.type === "CallExpression" && node.callee.type === "MemberExpression" && isPropertyAccessor(node.callee, "includes") && node.arguments.length === 1 && node.arguments[0].type !== "SpreadElement";
    prefer_to_contain_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect" || call.matcherArgs.length === 0)
              return;
            const expect = getParent(call.head.node);
            if (expect?.type !== "CallExpression")
              return;
            const [includesCall] = expect.arguments;
            const { matcher } = call;
            const [matcherArg] = call.matcherArgs;
            if (!includesCall || matcherArg.type === "SpreadElement" || !equalityMatchers.has(getStringValue(matcher)) || !isBooleanLiteral(matcherArg) || !isFixableIncludesCallExpression(includesCall)) {
              return;
            }
            const notModifier = call.modifiers.find(
              (node2) => getStringValue(node2) === "not"
            );
            context.report({
              fix(fixer) {
                const addNotModifier = matcherArg.type === "Literal" && matcherArg.value === !!notModifier;
                const fixes = [
                  // remove the "includes" call entirely
                  fixer.removeRange([
                    includesCall.callee.property.range[0] - 1,
                    includesCall.range[1]
                  ]),
                  // replace the current matcher with "toContain", adding "not" if needed
                  fixer.replaceText(
                    matcher,
                    addNotModifier ? "not.toContain" : "toContain"
                  ),
                  // replace the matcher argument with the value from the "includes"
                  fixer.replaceText(
                    call.matcherArgs[0],
                    context.sourceCode.getText(includesCall.arguments[0])
                  )
                ];
                if (notModifier) {
                  fixes.push(
                    fixer.removeRange([
                      notModifier.range[0],
                      notModifier.range[1] + 1
                    ])
                  );
                }
                return fixes;
              },
              messageId: "useToContain",
              node: matcher
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest using toContain()",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-contain.md"
        },
        fixable: "code",
        messages: {
          useToContain: "Use toContain() instead"
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-to-have-count.ts
var prefer_to_have_count_default;
var init_prefer_to_have_count = __esm({
  "src/rules/prefer-to-have-count.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_fixer();
    init_parseFnCall();
    prefer_to_have_count_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect" || !equalityMatchers.has(call.matcherName)) {
              return;
            }
            const argument = dereference(context, call.args[0]);
            if (argument?.type !== "AwaitExpression" || argument.argument.type !== "CallExpression" || argument.argument.callee.type !== "MemberExpression" || !isPropertyAccessor(argument.argument.callee, "count")) {
              return;
            }
            const callee = argument.argument.callee;
            context.report({
              fix(fixer) {
                return [
                  // remove the "await" expression
                  fixer.removeRange([
                    argument.range[0],
                    argument.range[0] + "await".length + 1
                  ]),
                  // remove the "count()" method accessor
                  fixer.removeRange([
                    callee.property.range[0] - 1,
                    argument.argument.range[1]
                  ]),
                  // replace the current matcher with "toHaveCount"
                  replaceAccessorFixer(fixer, call.matcher, "toHaveCount"),
                  // insert "await" to before "expect()"
                  fixer.insertTextBefore(node, "await ")
                ];
              },
              messageId: "useToHaveCount",
              node: call.matcher
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest using `toHaveCount()`",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-have-count.md"
        },
        fixable: "code",
        messages: {
          useToHaveCount: "Use toHaveCount() instead"
        },
        schema: [],
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-to-have-length.ts
var prefer_to_have_length_default;
var init_prefer_to_have_length = __esm({
  "src/rules/prefer-to-have-length.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_fixer();
    init_parseFnCall();
    prefer_to_have_length_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect" || !equalityMatchers.has(call.matcherName)) {
              return;
            }
            const [argument] = call.args;
            if (argument?.type !== "MemberExpression" || !isPropertyAccessor(argument, "length")) {
              return;
            }
            context.report({
              fix(fixer) {
                return [
                  // remove the "length" property accessor
                  fixer.removeRange([
                    argument.property.range[0] - 1,
                    argument.range[1]
                  ]),
                  // replace the current matcher with "toHaveLength"
                  replaceAccessorFixer(fixer, call.matcher, "toHaveLength")
                ];
              },
              messageId: "useToHaveLength",
              node: call.matcher
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Suggest using `toHaveLength()`",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-to-have-length.md"
        },
        fixable: "code",
        messages: {
          useToHaveLength: "Use toHaveLength() instead"
        },
        schema: [],
        type: "suggestion"
      }
    });
  }
});

// src/rules/prefer-web-first-assertions.ts
var methods3, supportedMatchers, prefer_web_first_assertions_default;
var init_prefer_web_first_assertions = __esm({
  "src/rules/prefer-web-first-assertions.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    methods3 = {
      getAttribute: {
        matcher: "toHaveAttribute",
        type: "string"
      },
      innerText: { matcher: "toHaveText", type: "string" },
      inputValue: { matcher: "toHaveValue", type: "string" },
      isChecked: {
        matcher: "toBeChecked",
        prop: "checked",
        type: "boolean"
      },
      isDisabled: {
        inverse: "toBeEnabled",
        matcher: "toBeDisabled",
        type: "boolean"
      },
      isEditable: { matcher: "toBeEditable", type: "boolean" },
      isEnabled: {
        inverse: "toBeDisabled",
        matcher: "toBeEnabled",
        type: "boolean"
      },
      isHidden: {
        inverse: "toBeVisible",
        matcher: "toBeHidden",
        type: "boolean"
      },
      isVisible: {
        inverse: "toBeHidden",
        matcher: "toBeVisible",
        type: "boolean"
      },
      textContent: { matcher: "toHaveText", type: "string" }
    };
    supportedMatchers = /* @__PURE__ */ new Set([
      "toBe",
      "toEqual",
      "toBeTruthy",
      "toBeFalsy"
    ]);
    prefer_web_first_assertions_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect")
              return;
            const expect = findParent(call.head.node, "CallExpression");
            if (!expect)
              return;
            const arg = dereference(context, call.args[0]);
            if (!arg || arg.type !== "AwaitExpression" || arg.argument.type !== "CallExpression" || arg.argument.callee.type !== "MemberExpression") {
              return;
            }
            if (!supportedMatchers.has(call.matcherName))
              return;
            const method = getStringValue(arg.argument.callee.property);
            const methodConfig = methods3[method];
            if (!methodConfig)
              return;
            const notModifier = call.modifiers.find(
              (mod) => getStringValue(mod) === "not"
            );
            const isFalsy = methodConfig.type === "boolean" && (!!call.matcherArgs.length && isBooleanLiteral(call.matcherArgs[0], false) || call.matcherName === "toBeFalsy");
            const isInverse = methodConfig.inverse ? notModifier || isFalsy : notModifier && isFalsy;
            const newMatcher = +!!notModifier ^ +isFalsy && methodConfig.inverse || methodConfig.matcher;
            const { callee } = arg.argument;
            context.report({
              data: {
                matcher: newMatcher,
                method
              },
              fix: (fixer) => {
                const methodArgs = arg.argument.type === "CallExpression" ? arg.argument.arguments : [];
                const methodEnd = methodArgs.length ? methodArgs.at(-1).range[1] + 1 : callee.property.range[1] + 2;
                const fixes = [
                  // Add await to the expect call
                  fixer.insertTextBefore(expect, "await "),
                  // Remove the await keyword
                  fixer.replaceTextRange(
                    [arg.range[0], arg.argument.range[0]],
                    ""
                  ),
                  // Remove the old Playwright method and any arguments
                  fixer.replaceTextRange(
                    [callee.property.range[0] - 1, methodEnd],
                    ""
                  )
                ];
                if (isInverse && notModifier) {
                  const notRange = notModifier.range;
                  fixes.push(fixer.removeRange([notRange[0], notRange[1] + 1]));
                }
                if (!methodConfig.inverse && !notModifier && isFalsy) {
                  fixes.push(fixer.insertTextBefore(call.matcher, "not."));
                }
                fixes.push(fixer.replaceText(call.matcher, newMatcher));
                const [matcherArg] = call.matcherArgs ?? [];
                if (matcherArg && isBooleanLiteral(matcherArg)) {
                  fixes.push(fixer.remove(matcherArg));
                } else if (methodConfig.prop && matcherArg) {
                  const propArg = methodConfig.prop;
                  const variable = getStringValue(matcherArg);
                  const args = `{ ${propArg}: ${variable} }`;
                  fixes.push(fixer.replaceText(matcherArg, args));
                }
                const hasOtherArgs = !!methodArgs.filter(
                  (arg2) => !isBooleanLiteral(arg2)
                ).length;
                if (methodArgs) {
                  const range = call.matcher.range;
                  const stringArgs = methodArgs.map((arg2) => getRawValue(arg2)).concat(hasOtherArgs ? "" : []).join(", ");
                  fixes.push(
                    fixer.insertTextAfterRange(
                      [range[0], range[1] + 1],
                      stringArgs
                    )
                  );
                }
                return fixes;
              },
              messageId: "useWebFirstAssertion",
              node: expect
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Prefer web first assertions",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/prefer-web-first-assertions.md"
        },
        fixable: "code",
        messages: {
          useWebFirstAssertion: "Replace {{method}}() with {{matcher}}()."
        },
        type: "suggestion"
      }
    });
  }
});

// src/rules/require-hook.ts
var isNullOrUndefined, shouldBeInHook, require_hook_default;
var init_require_hook = __esm({
  "src/rules/require-hook.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    isNullOrUndefined = (node) => {
      return node.type === "Literal" && node.value === null || isIdentifier(node, "undefined");
    };
    shouldBeInHook = (context, node, allowedFunctionCalls = []) => {
      switch (node.type) {
        case "ExpressionStatement":
          return shouldBeInHook(context, node.expression, allowedFunctionCalls);
        case "CallExpression":
          return !(parseFnCall(context, node) || allowedFunctionCalls.includes(getStringValue(node.callee)));
        case "VariableDeclaration": {
          if (node.kind === "const") {
            return false;
          }
          return node.declarations.some(
            ({ init }) => init != null && !isNullOrUndefined(init)
          );
        }
        default:
          return false;
      }
    };
    require_hook_default = createRule({
      create(context) {
        const options = {
          allowedFunctionCalls: [],
          ...context.options?.[0] ?? {}
        };
        const checkBlockBody = (body) => {
          for (const statement of body) {
            if (shouldBeInHook(context, statement, options.allowedFunctionCalls)) {
              context.report({
                messageId: "useHook",
                node: statement
              });
            }
          }
        };
        return {
          CallExpression(node) {
            if (!isTypeOfFnCall(context, node, ["describe"])) {
              return;
            }
            const testFn = node.arguments.at(-1);
            if (!isFunction(testFn) || testFn.body.type !== "BlockStatement") {
              return;
            }
            checkBlockBody(testFn.body.body);
          },
          Program(program) {
            checkBlockBody(program.body);
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Require setup and teardown code to be within a hook",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-hook.md"
        },
        messages: {
          useHook: "This should be done within a hook"
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              allowedFunctionCalls: {
                items: { type: "string" },
                type: "array"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/require-soft-assertions.ts
var require_soft_assertions_default;
var init_require_soft_assertions = __esm({
  "src/rules/require-soft-assertions.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    require_soft_assertions_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect" || call.modifiers.some((m) => {
              const name = getStringValue(m);
              return name === "soft" || name === "poll";
            })) {
              return;
            }
            context.report({
              fix: (fixer) => fixer.insertTextAfter(call.head.node, ".soft"),
              messageId: "requireSoft",
              node: call.head.node
            });
          }
        };
      },
      meta: {
        docs: {
          description: "Require all assertions to use `expect.soft`",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-soft-assertions.md"
        },
        fixable: "code",
        messages: {
          requireSoft: "Unexpected non-soft assertion"
        },
        schema: [],
        type: "suggestion"
      }
    });
  }
});

// src/rules/require-to-throw-message.ts
var require_to_throw_message_default;
var init_require_to_throw_message = __esm({
  "src/rules/require-to-throw-message.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    require_to_throw_message_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "expect")
              return;
            if (call.matcherArgs.length === 0 && ["toThrow", "toThrowError"].includes(call.matcherName) && !call.modifiers.some((nod) => getStringValue(nod) === "not")) {
              context.report({
                data: { matcherName: call.matcherName },
                messageId: "addErrorMessage",
                node: call.matcher
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Require a message for `toThrow()`",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-to-throw-message.md"
        },
        messages: {
          addErrorMessage: "Add an error message to {{ matcherName }}()"
        },
        schema: [],
        type: "suggestion"
      }
    });
  }
});

// src/rules/require-top-level-describe.ts
var require_top_level_describe_default;
var init_require_top_level_describe = __esm({
  "src/rules/require-top-level-describe.ts"() {
    "use strict";
    init_createRule();
    init_misc();
    init_parseFnCall();
    require_top_level_describe_default = createRule({
      create(context) {
        const { maxTopLevelDescribes } = {
          maxTopLevelDescribes: Infinity,
          ...context.options?.[0] ?? {}
        };
        let topLevelDescribeCount = 0;
        let describeCount = 0;
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (!call)
              return;
            if (call.type === "describe") {
              describeCount++;
              if (describeCount === 1) {
                topLevelDescribeCount++;
                if (topLevelDescribeCount > maxTopLevelDescribes) {
                  context.report({
                    data: getAmountData(maxTopLevelDescribes),
                    messageId: "tooManyDescribes",
                    node: node.callee
                  });
                }
              }
            } else if (!describeCount) {
              if (call.type === "test") {
                context.report({ messageId: "unexpectedTest", node: node.callee });
              } else if (call.type === "hook") {
                context.report({ messageId: "unexpectedHook", node: node.callee });
              }
            }
          },
          "CallExpression:exit"(node) {
            if (isTypeOfFnCall(context, node, ["describe"])) {
              describeCount--;
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Require test cases and hooks to be inside a `test.describe` block",
          recommended: false,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/require-top-level-describe.md"
        },
        messages: {
          tooManyDescribes: "There should not be more than {{max}} describe{{s}} at the top level",
          unexpectedHook: "All hooks must be wrapped in a describe block.",
          unexpectedTest: "All test cases must be wrapped in a describe block."
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              maxTopLevelDescribes: {
                minimum: 1,
                type: "number"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/rules/valid-describe-callback.ts
var paramsLocation, valid_describe_callback_default;
var init_valid_describe_callback = __esm({
  "src/rules/valid-describe-callback.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    paramsLocation = (params) => {
      const [first] = params;
      const last = params[params.length - 1];
      return {
        end: last.loc.end,
        start: first.loc.start
      };
    };
    valid_describe_callback_default = createRule({
      create(context) {
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.group !== "describe")
              return;
            if (call.members.some((s) => getStringValue(s) === "configure")) {
              return;
            }
            const callback = node.arguments.at(-1);
            if (!callback) {
              return context.report({
                loc: node.loc,
                messageId: "missingCallback"
              });
            }
            if (node.arguments.length === 1 && isStringLiteral(callback)) {
              return context.report({
                loc: paramsLocation(node.arguments),
                messageId: "missingCallback"
              });
            }
            if (!isFunction(callback)) {
              return context.report({
                loc: paramsLocation(node.arguments),
                messageId: "invalidCallback"
              });
            }
            if (callback.async) {
              context.report({
                messageId: "noAsyncDescribeCallback",
                node: callback
              });
            }
            if (callback.params.length) {
              context.report({
                loc: paramsLocation(callback.params),
                messageId: "unexpectedDescribeArgument"
              });
            }
            if (callback.body.type === "CallExpression") {
              context.report({
                messageId: "unexpectedReturnInDescribe",
                node: callback
              });
            }
            if (callback.body.type === "BlockStatement") {
              callback.body.body.forEach((node2) => {
                if (node2.type === "ReturnStatement") {
                  context.report({
                    messageId: "unexpectedReturnInDescribe",
                    node: node2
                  });
                }
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "Enforce valid `describe()` callback",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-describe-callback.md"
        },
        messages: {
          invalidCallback: "Callback argument must be a function",
          missingCallback: "Describe requires a callback",
          noAsyncDescribeCallback: "No async describe callback",
          unexpectedDescribeArgument: "Unexpected argument(s) in describe callback",
          unexpectedReturnInDescribe: "Unexpected return statement in describe callback"
        },
        schema: [],
        type: "problem"
      }
    });
  }
});

// src/rules/valid-expect.ts
var findTopMostMemberExpression, valid_expect_default;
var init_valid_expect = __esm({
  "src/rules/valid-expect.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_misc();
    init_parseFnCall();
    findTopMostMemberExpression = (node) => {
      let topMostMemberExpression = node;
      let parent = getParent(node);
      while (parent) {
        if (parent.type !== "MemberExpression") {
          break;
        }
        topMostMemberExpression = parent;
        parent = parent.parent;
      }
      return topMostMemberExpression;
    };
    valid_expect_default = createRule({
      create(context) {
        const options = {
          maxArgs: 2,
          minArgs: 1,
          ...context.options?.[0] ?? {}
        };
        const minArgs = Math.min(options.minArgs, options.maxArgs);
        const maxArgs = Math.max(options.minArgs, options.maxArgs);
        return {
          CallExpression(node) {
            const call = parseFnCallWithReason(context, node);
            if (typeof call === "string") {
              const reportingNode = node.parent?.type === "MemberExpression" ? findTopMostMemberExpression(node.parent).property : node;
              if (call === "matcher-not-found") {
                context.report({
                  messageId: "matcherNotFound",
                  node: reportingNode
                });
                return;
              }
              if (call === "matcher-not-called") {
                context.report({
                  messageId: isSupportedAccessor(reportingNode) && modifiers.has(getStringValue(reportingNode)) ? "matcherNotFound" : "matcherNotCalled",
                  node: reportingNode
                });
              }
              if (call === "modifier-unknown") {
                context.report({
                  messageId: "modifierUnknown",
                  node: reportingNode
                });
                return;
              }
              return;
            } else if (call?.type !== "expect") {
              return;
            }
            const expect = getParent(call.head.node);
            if (expect?.type !== "CallExpression")
              return;
            if (expect.arguments.length < minArgs) {
              const expectLength = getStringValue(call.head.node).length;
              const loc = {
                end: {
                  column: expect.loc.start.column + expectLength + 1,
                  line: expect.loc.start.line
                },
                start: {
                  column: expect.loc.start.column + expectLength,
                  line: expect.loc.start.line
                }
              };
              context.report({
                data: getAmountData(minArgs),
                loc,
                messageId: "notEnoughArgs",
                node: expect
              });
            }
            if (expect.arguments.length > maxArgs) {
              const { start } = expect.arguments[maxArgs].loc;
              const { end } = expect.arguments.at(-1).loc;
              const loc = {
                end: {
                  column: end.column,
                  line: end.line
                },
                start
              };
              context.report({
                data: getAmountData(maxArgs),
                loc,
                messageId: "tooManyArgs",
                node: expect
              });
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Possible Errors",
          description: "Enforce valid `expect()` usage",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-expect.md"
        },
        messages: {
          matcherNotCalled: "Matchers must be called to assert.",
          matcherNotFound: "Expect must have a corresponding matcher call.",
          notEnoughArgs: "Expect requires at least {{amount}} argument{{s}}.",
          tooManyArgs: "Expect takes at most {{amount}} argument{{s}}."
        },
        schema: [
          {
            additionalProperties: false,
            properties: {
              maxArgs: {
                minimum: 1,
                type: "number"
              },
              minArgs: {
                minimum: 1,
                type: "number"
              }
            },
            type: "object"
          }
        ],
        type: "problem"
      }
    });
  }
});

// src/rules/valid-expect-in-promise.ts
var isPromiseChainCall, isTestCaseCallWithCallbackArg, isPromiseMethodThatUsesValue, isValueAwaitedInElements, isValueAwaitedInArguments, getLeftMostCallExpression, isValueAwaitedOrReturned, findFirstBlockBodyUp, isDirectlyWithinTestCaseCall, isVariableAwaitedOrReturned, valid_expect_in_promise_default;
var init_valid_expect_in_promise = __esm({
  "src/rules/valid-expect-in-promise.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    isPromiseChainCall = (node) => {
      if (node.type === "CallExpression" && node.callee.type === "MemberExpression" && isSupportedAccessor(node.callee.property)) {
        if (node.arguments.length === 0) {
          return false;
        }
        switch (getStringValue(node.callee.property)) {
          case "then":
            return node.arguments.length < 3;
          case "catch":
          case "finally":
            return node.arguments.length < 2;
        }
      }
      return false;
    };
    isTestCaseCallWithCallbackArg = (context, node) => {
      const jestCallFn = parseFnCall(context, node);
      if (jestCallFn?.type !== "test") {
        return false;
      }
      const isJestEach = jestCallFn.members.some(
        (s) => getStringValue(s) === "each"
      );
      if (isJestEach && node.callee.type !== "TaggedTemplateExpression") {
        return true;
      }
      const [, callback] = node.arguments;
      const callbackArgIndex = Number(isJestEach);
      return callback && isFunction(callback) && callback.params.length === 1 + callbackArgIndex;
    };
    isPromiseMethodThatUsesValue = (node, identifier) => {
      const name = getStringValue(identifier);
      if (node.argument == null)
        return false;
      if (node.argument.type === "CallExpression" && node.argument.arguments.length > 0) {
        const nodeName = getNodeName(node.argument);
        if (["Promise.all", "Promise.allSettled"].includes(nodeName)) {
          const [firstArg] = node.argument.arguments;
          if (firstArg.type === "ArrayExpression" && firstArg.elements.some((nod) => nod && isIdentifier(nod, name))) {
            return true;
          }
        }
        if (["Promise.resolve", "Promise.reject"].includes(nodeName) && node.argument.arguments.length === 1) {
          return isIdentifier(node.argument.arguments[0], name);
        }
      }
      return isIdentifier(node.argument, name);
    };
    isValueAwaitedInElements = (name, elements) => {
      for (const element of elements) {
        if (element?.type === "AwaitExpression" && isIdentifier(element.argument, name)) {
          return true;
        }
        if (element?.type === "ArrayExpression" && isValueAwaitedInElements(name, element.elements)) {
          return true;
        }
      }
      return false;
    };
    isValueAwaitedInArguments = (name, call) => {
      let node = call;
      while (node) {
        if (node.type === "CallExpression") {
          if (isValueAwaitedInElements(name, node.arguments)) {
            return true;
          }
          node = node.callee;
        }
        if (node.type !== "MemberExpression") {
          break;
        }
        node = node.object;
      }
      return false;
    };
    getLeftMostCallExpression = (call) => {
      let leftMostCallExpression = call;
      let node = call;
      while (node) {
        if (node.type === "CallExpression") {
          leftMostCallExpression = node;
          node = node.callee;
        }
        if (node.type !== "MemberExpression") {
          break;
        }
        node = node.object;
      }
      return leftMostCallExpression;
    };
    isValueAwaitedOrReturned = (context, identifier, body) => {
      const name = getStringValue(identifier);
      for (const node of body) {
        if (node.range[0] <= identifier.range[0]) {
          continue;
        }
        if (node.type === "ReturnStatement") {
          return isPromiseMethodThatUsesValue(node, identifier);
        }
        if (node.type === "ExpressionStatement") {
          if (node.expression.type === "CallExpression") {
            if (isValueAwaitedInArguments(name, node.expression)) {
              return true;
            }
            const leftMostCall = getLeftMostCallExpression(node.expression);
            const call = parseFnCall(context, node.expression);
            if (call?.type === "expect" && leftMostCall.arguments.length > 0 && isIdentifier(leftMostCall.arguments[0], name)) {
              if (call.members.some((m) => {
                const v = getStringValue(m);
                return v === "resolves" || v === "rejects";
              })) {
                return true;
              }
            }
          }
          if (node.expression.type === "AwaitExpression" && isPromiseMethodThatUsesValue(node.expression, identifier)) {
            return true;
          }
          if (node.expression.type === "AssignmentExpression") {
            if (isIdentifier(node.expression.left, name) && getNodeName(node.expression.right)?.startsWith(`${name}.`) && isPromiseChainCall(node.expression.right)) {
              continue;
            }
            break;
          }
        }
        if (node.type === "BlockStatement" && isValueAwaitedOrReturned(context, identifier, node.body)) {
          return true;
        }
      }
      return false;
    };
    findFirstBlockBodyUp = (node) => {
      let parent = node;
      while (parent) {
        if (parent.type === "BlockStatement") {
          return parent.body;
        }
        parent = getParent(parent);
      }
      throw new Error(
        `Could not find BlockStatement - please file a github issue at https://github.com/playwright-community/eslint-plugin-playwright`
      );
    };
    isDirectlyWithinTestCaseCall = (context, node) => {
      let parent = node;
      while (parent) {
        if (isFunction(parent)) {
          parent = parent.parent;
          return parent?.type === "CallExpression" && isTypeOfFnCall(context, parent, ["test"]);
        }
        parent = getParent(parent);
      }
      return false;
    };
    isVariableAwaitedOrReturned = (context, variable) => {
      const body = findFirstBlockBodyUp(variable);
      if (!isIdentifier(variable.id)) {
        return true;
      }
      return isValueAwaitedOrReturned(context, variable.id, body);
    };
    valid_expect_in_promise_default = createRule({
      create(context) {
        let inTestCaseWithDoneCallback = false;
        const chains = [];
        return {
          CallExpression(node) {
            if (isTestCaseCallWithCallbackArg(context, node)) {
              inTestCaseWithDoneCallback = true;
              return;
            }
            if (isPromiseChainCall(node)) {
              chains.unshift(false);
              return;
            }
            if (chains.length > 0 && isTypeOfFnCall(context, node, ["expect"])) {
              chains[0] = true;
            }
          },
          "CallExpression:exit"(node) {
            if (inTestCaseWithDoneCallback) {
              if (isTypeOfFnCall(context, node, ["test"])) {
                inTestCaseWithDoneCallback = false;
              }
              return;
            }
            if (!isPromiseChainCall(node)) {
              return;
            }
            const hasExpectCall = chains.shift();
            if (!hasExpectCall) {
              return;
            }
            const { parent } = findTopMostCallExpression(node);
            if (!parent || !isDirectlyWithinTestCaseCall(context, parent)) {
              return;
            }
            switch (parent.type) {
              case "VariableDeclarator": {
                if (isVariableAwaitedOrReturned(context, parent)) {
                  return;
                }
                break;
              }
              case "AssignmentExpression": {
                if (parent.left.type === "Identifier" && isValueAwaitedOrReturned(
                  context,
                  parent.left,
                  findFirstBlockBodyUp(parent)
                )) {
                  return;
                }
                break;
              }
              case "ExpressionStatement":
                break;
              case "ReturnStatement":
              case "AwaitExpression":
              default:
                return;
            }
            context.report({
              messageId: "expectInFloatingPromise",
              node: parent
            });
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Require promises that have expectations in their chain to be valid",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-expect-in-promise.md"
        },
        messages: {
          expectInFloatingPromise: "This promise should either be returned or awaited to ensure the expects in its chain are called"
        },
        schema: [],
        type: "suggestion"
      }
    });
  }
});

// src/rules/valid-title.ts
var doesBinaryExpressionContainStringNode, quoteStringValue, compileMatcherPattern, compileMatcherPatterns, MatcherAndMessageSchema, valid_title_default;
var init_valid_title = __esm({
  "src/rules/valid-title.ts"() {
    "use strict";
    init_ast();
    init_createRule();
    init_parseFnCall();
    doesBinaryExpressionContainStringNode = (binaryExp) => {
      if (isStringNode(binaryExp.right)) {
        return true;
      }
      if (binaryExp.left.type === "BinaryExpression") {
        return doesBinaryExpressionContainStringNode(binaryExp.left);
      }
      return isStringNode(binaryExp.left);
    };
    quoteStringValue = (node) => node.type === "TemplateLiteral" ? `\`${node.quasis[0].value.raw}\`` : node.raw ?? "";
    compileMatcherPattern = (matcherMaybeWithMessage) => {
      const [matcher, message] = Array.isArray(matcherMaybeWithMessage) ? matcherMaybeWithMessage : [matcherMaybeWithMessage];
      return [new RegExp(matcher, "u"), message];
    };
    compileMatcherPatterns = (matchers) => {
      if (typeof matchers === "string" || Array.isArray(matchers)) {
        const compiledMatcher = compileMatcherPattern(matchers);
        return {
          describe: compiledMatcher,
          test: compiledMatcher
        };
      }
      return {
        describe: matchers.describe ? compileMatcherPattern(matchers.describe) : null,
        test: matchers.test ? compileMatcherPattern(matchers.test) : null
      };
    };
    MatcherAndMessageSchema = {
      additionalItems: false,
      items: { type: "string" },
      maxItems: 2,
      minItems: 1,
      type: "array"
    };
    valid_title_default = createRule({
      create(context) {
        const opts = context.options?.[0] ?? {};
        const {
          disallowedWords = [],
          ignoreSpaces = false,
          ignoreTypeOfDescribeName = false,
          ignoreTypeOfTestName = false,
          mustMatch,
          mustNotMatch
        } = opts;
        const disallowedWordsRegexp = new RegExp(
          `\\b(${disallowedWords.join("|")})\\b`,
          "iu"
        );
        const mustNotMatchPatterns = compileMatcherPatterns(mustNotMatch ?? {});
        const mustMatchPatterns = compileMatcherPatterns(mustMatch ?? {});
        return {
          CallExpression(node) {
            const call = parseFnCall(context, node);
            if (call?.type !== "test" && call?.type !== "describe") {
              return;
            }
            const [argument] = node.arguments;
            if (!argument)
              return;
            if (!isStringNode(argument)) {
              if (argument.type === "BinaryExpression" && doesBinaryExpressionContainStringNode(argument)) {
                return;
              }
              if (!(call.type === "describe" && ignoreTypeOfDescribeName || call.type === "test" && ignoreTypeOfTestName) && argument.type !== "TemplateLiteral") {
                context.report({
                  loc: argument.loc,
                  messageId: "titleMustBeString"
                });
              }
              return;
            }
            const title = getStringValue(argument);
            const functionName = call.type;
            if (!title) {
              context.report({
                data: { functionName: call.type },
                messageId: "emptyTitle",
                node
              });
              return;
            }
            if (disallowedWords.length > 0) {
              const disallowedMatch = disallowedWordsRegexp.exec(title);
              if (disallowedMatch) {
                context.report({
                  data: { word: disallowedMatch[1] },
                  messageId: "disallowedWord",
                  node: argument
                });
                return;
              }
            }
            if (ignoreSpaces === false && title.trim().length !== title.length) {
              context.report({
                fix: (fixer) => [
                  fixer.replaceTextRange(
                    argument.range,
                    quoteStringValue(argument).replace(/^([`'"]) +?/u, "$1").replace(/ +?([`'"])$/u, "$1")
                  )
                ],
                messageId: "accidentalSpace",
                node: argument
              });
            }
            const [firstWord] = title.split(" ");
            if (firstWord.toLowerCase() === functionName) {
              context.report({
                fix: (fixer) => [
                  fixer.replaceTextRange(
                    argument.range,
                    quoteStringValue(argument).replace(/^([`'"]).+? /u, "$1")
                  )
                ],
                messageId: "duplicatePrefix",
                node: argument
              });
            }
            const [mustNotMatchPattern, mustNotMatchMessage] = mustNotMatchPatterns[functionName] ?? [];
            if (mustNotMatchPattern && mustNotMatchPattern.test(title)) {
              context.report({
                data: {
                  functionName,
                  message: mustNotMatchMessage ?? "",
                  pattern: String(mustNotMatchPattern)
                },
                messageId: mustNotMatchMessage ? "mustNotMatchCustom" : "mustNotMatch",
                node: argument
              });
              return;
            }
            const [mustMatchPattern, mustMatchMessage] = mustMatchPatterns[functionName] ?? [];
            if (mustMatchPattern && !mustMatchPattern.test(title)) {
              context.report({
                data: {
                  functionName,
                  message: mustMatchMessage ?? "",
                  pattern: String(mustMatchPattern)
                },
                messageId: mustMatchMessage ? "mustMatchCustom" : "mustMatch",
                node: argument
              });
              return;
            }
          }
        };
      },
      meta: {
        docs: {
          category: "Best Practices",
          description: "Enforce valid titles",
          recommended: true,
          url: "https://github.com/playwright-community/eslint-plugin-playwright/tree/main/docs/rules/valid-title.md"
        },
        fixable: "code",
        messages: {
          accidentalSpace: "should not have leading or trailing spaces",
          disallowedWord: '"{{ word }}" is not allowed in test titles',
          duplicatePrefix: "should not have duplicate prefix",
          emptyTitle: "{{ functionName }} should not have an empty title",
          mustMatch: "{{ functionName }} should match {{ pattern }}",
          mustMatchCustom: "{{ message }}",
          mustNotMatch: "{{ functionName }} should not match {{ pattern }}",
          mustNotMatchCustom: "{{ message }}",
          titleMustBeString: "Title must be a string"
        },
        schema: [
          {
            additionalProperties: false,
            patternProperties: {
              [/^must(?:Not)?Match$/u.source]: {
                oneOf: [
                  { type: "string" },
                  MatcherAndMessageSchema,
                  {
                    additionalProperties: {
                      oneOf: [{ type: "string" }, MatcherAndMessageSchema]
                    },
                    propertyNames: { enum: ["describe", "test"] },
                    type: "object"
                  }
                ]
              }
            },
            properties: {
              disallowedWords: {
                items: { type: "string" },
                type: "array"
              },
              ignoreSpaces: {
                default: false,
                type: "boolean"
              },
              ignoreTypeOfDescribeName: {
                default: false,
                type: "boolean"
              },
              ignoreTypeOfTestName: {
                default: false,
                type: "boolean"
              }
            },
            type: "object"
          }
        ],
        type: "suggestion"
      }
    });
  }
});

// src/index.ts
import globals from "globals";
var require_src = __commonJS({
  "src/index.ts"(exports, module) {
    init_expect_expect();
    init_max_expects();
    init_max_nested_describe();
    init_missing_playwright_await();
    init_no_commented_out_tests();
    init_no_conditional_expect();
    init_no_conditional_in_test();
    init_no_duplicate_hooks();
    init_no_element_handle();
    init_no_eval();
    init_no_focused_test();
    init_no_force_option();
    init_no_get_by_title();
    init_no_hooks();
    init_no_nested_step();
    init_no_networkidle();
    init_no_nth_methods();
    init_no_page_pause();
    init_no_raw_locators();
    init_no_restricted_matchers();
    init_no_skipped_test();
    init_no_standalone_expect();
    init_no_unsafe_references();
    init_no_useless_await();
    init_no_useless_not();
    init_no_wait_for_selector();
    init_no_wait_for_timeout();
    init_prefer_comparison_matcher();
    init_prefer_equality_matcher();
    init_prefer_hooks_in_order();
    init_prefer_hooks_on_top();
    init_prefer_lowercase_title();
    init_prefer_strict_equal();
    init_prefer_to_be();
    init_prefer_to_contain();
    init_prefer_to_have_count();
    init_prefer_to_have_length();
    init_prefer_web_first_assertions();
    init_require_hook();
    init_require_soft_assertions();
    init_require_to_throw_message();
    init_require_top_level_describe();
    init_valid_describe_callback();
    init_valid_expect();
    init_valid_expect_in_promise();
    init_valid_title();
    var index = {
      configs: {},
      rules: {
        "expect-expect": expect_expect_default,
        "max-expects": max_expects_default,
        "max-nested-describe": max_nested_describe_default,
        "missing-playwright-await": missing_playwright_await_default,
        "no-commented-out-tests": no_commented_out_tests_default,
        "no-conditional-expect": no_conditional_expect_default,
        "no-conditional-in-test": no_conditional_in_test_default,
        "no-duplicate-hooks": no_duplicate_hooks_default,
        "no-element-handle": no_element_handle_default,
        "no-eval": no_eval_default,
        "no-focused-test": no_focused_test_default,
        "no-force-option": no_force_option_default,
        "no-get-by-title": no_get_by_title_default,
        "no-hooks": no_hooks_default,
        "no-nested-step": no_nested_step_default,
        "no-networkidle": no_networkidle_default,
        "no-nth-methods": no_nth_methods_default,
        "no-page-pause": no_page_pause_default,
        "no-raw-locators": no_raw_locators_default,
        "no-restricted-matchers": no_restricted_matchers_default,
        "no-skipped-test": no_skipped_test_default,
        "no-standalone-expect": no_standalone_expect_default,
        "no-unsafe-references": no_unsafe_references_default,
        "no-useless-await": no_useless_await_default,
        "no-useless-not": no_useless_not_default,
        "no-wait-for-selector": no_wait_for_selector_default,
        "no-wait-for-timeout": no_wait_for_timeout_default,
        "prefer-comparison-matcher": prefer_comparison_matcher_default,
        "prefer-equality-matcher": prefer_equality_matcher_default,
        "prefer-hooks-in-order": prefer_hooks_in_order_default,
        "prefer-hooks-on-top": prefer_hooks_on_top_default,
        "prefer-lowercase-title": prefer_lowercase_title_default,
        "prefer-strict-equal": prefer_strict_equal_default,
        "prefer-to-be": prefer_to_be_default,
        "prefer-to-contain": prefer_to_contain_default,
        "prefer-to-have-count": prefer_to_have_count_default,
        "prefer-to-have-length": prefer_to_have_length_default,
        "prefer-web-first-assertions": prefer_web_first_assertions_default,
        "require-hook": require_hook_default,
        "require-soft-assertions": require_soft_assertions_default,
        "require-to-throw-message": require_to_throw_message_default,
        "require-top-level-describe": require_top_level_describe_default,
        "valid-describe-callback": valid_describe_callback_default,
        "valid-expect": valid_expect_default,
        "valid-expect-in-promise": valid_expect_in_promise_default,
        "valid-title": valid_title_default
      }
    };
    var sharedConfig = {
      rules: {
        "no-empty-pattern": "off",
        "playwright/expect-expect": "warn",
        "playwright/max-nested-describe": "warn",
        "playwright/missing-playwright-await": "error",
        "playwright/no-conditional-expect": "warn",
        "playwright/no-conditional-in-test": "warn",
        "playwright/no-element-handle": "warn",
        "playwright/no-eval": "warn",
        "playwright/no-focused-test": "error",
        "playwright/no-force-option": "warn",
        "playwright/no-nested-step": "warn",
        "playwright/no-networkidle": "error",
        "playwright/no-page-pause": "warn",
        "playwright/no-skipped-test": "warn",
        "playwright/no-standalone-expect": "error",
        "playwright/no-unsafe-references": "error",
        "playwright/no-useless-await": "warn",
        "playwright/no-useless-not": "warn",
        "playwright/no-wait-for-selector": "warn",
        "playwright/no-wait-for-timeout": "warn",
        "playwright/prefer-web-first-assertions": "error",
        "playwright/valid-describe-callback": "error",
        "playwright/valid-expect": "error",
        "playwright/valid-expect-in-promise": "error",
        "playwright/valid-title": "error"
      }
    };
    var legacyConfig = {
      ...sharedConfig,
      env: {
        "shared-node-browser": true
      },
      plugins: ["playwright"]
    };
    var flatConfig = {
      ...sharedConfig,
      languageOptions: {
        globals: globals["shared-node-browser"]
      },
      plugins: {
        playwright: index
      }
    };
    var sharedJestConfig = {
      rules: {
        "jest/no-standalone-expect": [
          "error",
          {
            additionalTestBlockFunctions: [
              "test.jestPlaywrightDebug",
              "it.jestPlaywrightDebug",
              "test.jestPlaywrightSkip",
              "it.jestPlaywrightSkip",
              "test.jestPlaywrightConfig",
              "it.jestPlaywrightConfig"
            ]
          }
        ],
        "playwright/missing-playwright-await": "error",
        "playwright/no-page-pause": "warn"
      }
    };
    var legacyJestConfig = {
      ...sharedJestConfig,
      env: {
        jest: true,
        "shared-node-browser": true
      },
      globals: {
        browser: true,
        browserName: true,
        context: true,
        deviceName: true,
        jestPlaywright: true,
        page: true
      },
      plugins: ["jest", "playwright"]
    };
    var jestConfig = {
      ...sharedJestConfig,
      languageOptions: {
        globals: {
          ...globals["shared-node-browser"],
          ...globals.jest,
          browser: "writable",
          browserName: "writable",
          context: "writable",
          deviceName: "writable",
          jestPlaywright: "writable",
          page: "writable"
        }
      },
      plugins: {
        playwright: index
      }
    };
    module.exports = {
      ...index,
      configs: {
        "flat/jest-playwright": jestConfig,
        "flat/recommended": flatConfig,
        "jest-playwright": legacyJestConfig,
        "playwright-test": legacyConfig,
        recommended: legacyConfig
      }
    };
  }
});
export default require_src();
