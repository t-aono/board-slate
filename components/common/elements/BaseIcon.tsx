export default function BaseIcon(props: any) {
  return (
    <div {...props} className="h-6 w-6 text-gray-600">
      {props.children}
    </div>
  );
}
