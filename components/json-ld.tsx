export function JsonLd({ data }: { data: object | object[] }) {
  return <>{(Array.isArray(data) ? data : [data]).map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />)}</>;
}
