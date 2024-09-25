"use client";
import { toast } from "@/components/ui/use-toast";
import RichTextEditor from "../components/text-editor";
import { CitationCheck } from "@/lib/checks/citation-check";
import { Hint } from "@/lib/checks/check";
import { useState } from "react";
import { NumberCheck } from "@/lib/checks/number-check";
import { CurrencyCheck } from "@/lib/checks/currency-check";
import { ThoughtDashCheck } from "@/lib/checks/thought-dash-check";
import { OxfordCommaCheck } from "@/lib/checks/oxford-comma-check";
import { ApostropheCheck } from "@/lib/checks/apostrophe-check";
import { QuotationMarkCheck } from "@/lib/checks/quotationmark-check";
import { Button } from "@/components/ui/button";
import { EgCommaCheck } from "@/lib/checks/eg-comma-check";
import { WordsCheck } from "@/lib/checks/words-check";
import { PercentageCheck } from "@/lib/checks/percentage-check";
import { NumberRangeCheck } from "@/lib/checks/number-range-check";

const checks = [
  new CitationCheck(),
  new NumberCheck(),
  new CurrencyCheck(),
  new ThoughtDashCheck(),
  new OxfordCommaCheck(),
  new ApostropheCheck(),
  new QuotationMarkCheck(),
  new EgCommaCheck(),
  new WordsCheck(),
  new PercentageCheck(),
  new NumberRangeCheck(),
];

export default function ProfileForm() {
  const [text, setText] = useState("");
  const [hints, setHints] = useState<Hint[]>([]);

  function copyContext(hint: Hint) {
    const from = hint.index - 24;
    const to = hint.index + hint.text.length + 24;
    const context = text.substring(
      from < 0 ? 0 : from,
      to > text.length ? text.length : to,
    );
    navigator.clipboard.writeText(context);
    toast({
      title: "Copied Context",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{context}</code>
        </pre>
      ),
    });
  }

  function onNewHints(hints: Hint[]) {
    setHints(hints);
    // toast({
    //   title: "Check Results",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">Done: {hints.length} hints</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="w-[740px] h-screen mx-auto">
      <h1 className="flex justify-center pt-20 text-2xl font-medium mb-12">
        CDTM | QA Check Tool
      </h1>
      <RichTextEditor
        value={text}
        onChange={setText}
        checks={checks}
        onNewHints={onNewHints}
      />
      <div className="flex flex-col gap-2 p-4">
        {hints.map((hint) => (
          <div
            key={hint.key}
            className="p-4 border border-solid border-red-400"
          >
            <h3>
              <b>{hint.index}</b> &quot;{hint.text}&quot;
            </h3>
            <p>{hint.hint}</p>
            <p>{hint.suggestion}</p>
            <Button onClick={() => copyContext(hint)}>Copy Context</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
