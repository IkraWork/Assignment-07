export default function Emoji({ value, className = "" }) {
  const isImage = /^(https?:)?\/\//.test(value) || value.startsWith("/");
  if (isImage) {
    return <img src={value} alt="" className={`inline-block h-10 w-10 object-contain ${className}`} />;
  }
  return <span className={className}>{value}</span>;
}
