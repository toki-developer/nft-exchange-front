import { User } from "src/components/Icon";
import { TextWithLine } from "src/components/Text";

/**
 * @package
 */
export const HowToUse = () => {
  return (
    <article className="text-textcolor-sub mt-28 max-w-4xl mx-auto">
      <TextWithLine tag="h3" className="text-center font-bold">
        使い方
      </TextWithLine>
      <div className="grid grid-cols-2 mt-8 mb-20 gap-y-8">
        <div>
          <UserIcon />
        </div>
        <div>
          <UserIcon />
        </div>
        <div>
          <Create />
        </div>
        <div className="row-span-2">
          <Arrow dark />
        </div>
        <div>
          <Arrow />
        </div>
        <div className="col-span-2">
          <UrlSend />
        </div>
        <div className="row-span-3">
          <Arrow dark />
        </div>
        <div>
          <Arrow />
        </div>
        <div>
          <Approve />
        </div>
        <div>
          <Arrow />
        </div>
        <div className="col-span-2">
          <Complete />
        </div>
      </div>
    </article>
  );
};

const UserIcon = () => <User className="w-12 h-12 mx-auto" />;

const Create = () => (
  <div className="bg-gray-800 w-2/3 mx-auto border border-gray-600 rounded text-sm">
    <p className="text-center mt-2">オファー作成ページ</p>
    <ol className="ml-4 mt-4 mb-4 [&>li]:mt-2">
      <li>1. 送るNFT・受け取るNFTの入力</li>
      <li>2. 自分のNFTの権限を付与(Approve)</li>
      <li>3. 交換オファーの作成</li>
      <li>4. 表示される交換用URLをコピー</li>
    </ol>
  </div>
);

const UrlSend = () => (
  <div className="flex relative">
    <p className="text-center flex-1">交換用URLを交換相手に送る</p>
    <p className="text-center flex-1">交換用URLを受け取り、開く</p>
    <div className="absolute top-1/2 translate-y-0.5 left-1/2 translate-x-10">
      <p className="absolute bottom-1 right-8 text-sm text-gray-600">URL</p>
      <div className="w-20 h-[2px] bg-gray-600 absolute bottom-0 right-0" />
      <div className="w-4 h-4 border-r-2 border-t-2 border-gray-600 rotate-45 absolute -bottom-[7px] right-0" />
    </div>
  </div>
);

const Approve = () => (
  <div className="bg-gray-800 w-2/3 mx-auto border border-gray-600 rounded text-sm">
    <p className="text-center mt-2">オファー承認ページ</p>
    <ol className="ml-4 mt-4 mb-4 [&>li]:mt-2">
      <li>1. オファーの確認</li>
      <li>2. 自分のNFTの権限を付与(Approve)</li>
      <li>3. 交換オファーを承認</li>
    </ol>
  </div>
);

const Complete = () => (
  <TextWithLine
    className="text-center text-primary w-2/3 mx-auto text-xl font-bold"
    borderColor="border-primary"
  >
    NFTの交換完了 🥳
  </TextWithLine>
);

const Arrow = ({ dark }: { dark?: boolean }) => (
  <div className="relative h-full min-h-[40px] w-fit mx-auto translate-x-0.5">
    <div
      className={`w-1 h-full ${
        dark ? "bg-gray-800" : "bg-gray-600"
      } absolute bottom-0 right-0`}
    />
    <div
      className={`w-6 h-6 border-r-4 border-b-4 ${
        dark ? "border-gray-800" : "border-gray-600"
      } rotate-45 absolute bottom-0 -right-[10px]`}
    />
  </div>
);
