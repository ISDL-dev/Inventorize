import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Image, Text, Button, Input, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";

//仮データ
/*const equipuments = [
    { id: 1, name: "ノートパソコン", imageUrl: "/images/laptop.jpg", location: "棚A" },
    { id: 2, name: "プロジェクター", imageUrl: "/images/projector.jpg", location: "棚B" },
    { id: 3, name: "HDMIケーブル", imageUrl: "/images/hdmi.jpg", location: "棚C" },
    { id: 4, name: "マウス", imageUrl: "/images/mausu.jpg", location: "棚D" },
    { id: 5, name: "キーボード", imageUrl: "/images/keyboard.jpg", location: "棚E" },
    { id: 6, name: "ディスプレイ", imageUrl: "/images/display.jpg", location: "棚F" },
    { id: 7, name: "Webカメラ", imageUrl: "/images/camera.jpg", location: "棚G" },
    { id: 8, name: "ヘッドセット", imageUrl: "/images/headset.jpg", location: "棚H" },
    { id: 9, name: "スピーカー", imageUrl: "/images/supi-ka-.jpg", location: "棚I" },
    { id: 10, name: "LANケーブル", imageUrl: "/images/lan.jpg", location: "棚J" },
    { id: 11, name: "USBハブ", imageUrl: "/images/usb.jpg", location: "棚K" },
  ];*/
type Item = {
  id: number;
  name: string;
  image_path: string;
  location: string;
  notes: string;
  is_available: boolean;
};

const ItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [reason, setReason] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // 編集モードの状態を追加
  const [updatedItem, setUpdatedItem] = useState<Item | null>(null); // 編集した物品情報の状態を保持

  useEffect(() => {
    fetch(`http://localhost:8000/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setUpdatedItem(data); // 編集用の初期状態として物品情報をセット
        setLoading(false);
      })
      .catch((err) => {
        console.error("詳細情報取得エラー:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBorrow = () => {
    if (!reason.trim()) {
      alert("理由を入力してください");
      return;
    }
    const user_id = 1; // ここは実際のユーザーIDを取得する必要がある
    const requestDate = {
      user_id,
      item_id: item!.id,
      reason,
      type: "borrow"
    };

    const borrowedItem = {
      id: item!.id,
      name: item!.name,
      image_path: `/images/${item!.image_path}`,
      requestDate,
      status: "承認待ち",
    };

    fetch(`http://localhost:8000/borrow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ user_id, item_id: item?.id, reason,type: "borrow" }),
      body: JSON.stringify(requestDate), // ← 修正済みのリクエストデータを送信
    })
      .then(res => {
        if (!res.ok) throw new Error("借用リクエストに失敗しました");
        alert("借用リクエストを送信しました");
        navigate("/mylist", { state: borrowedItem }); // 送信後にマイリストへ遷移
      })
      .catch(err => console.error(err));
  };

  // 編集内容を保存するための関数
  const handleSaveEdit = () => {
    if (!updatedItem) return;

    fetch(`http://localhost:8000/items/${updatedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then(res => {
        if (res.ok) {
          alert("情報が更新されました");
          setItem(updatedItem); // 更新した情報を反映
          setIsEditing(false); // 編集モードを終了
        } else {
          alert("情報の更新に失敗しました");
        }
      })
      .catch(err => {
        console.error("更新エラー:", err);
      });
  };

  // 編集をキャンセルして元に戻す関数
  const handleCancelEdit = () => {
    setUpdatedItem(item); // 編集前の情報に戻す
    setIsEditing(false); // 編集モードを終了
  };

  if(loading) {
    return <Spinner size="xl" />
  }
  if(!item) {
    return <Text>指示された物品が見つかりません</Text>
  }

  return (
    <Box p={8} position="relative">
      <Heading mb={8}>{item.name}</Heading>
      
      {/* 画像（クリックで拡大） */}
      {/* <Image src={item.imageUrl || "/images/noImage.jpg"} alt={item.name} boxSize="300px" objectFit="cover" mb={4} cursor="pointer" onClick={() => setIsZoomed(true)} onError={(e) => {(e.target as HTMLImageElement).src = "/images/noImage.jpg"}}/>*/}

      {/* <Text fontSize="lg">保管場所: {item.location}</Text> */}

      {/* 戻るボタン */}
      <Button size="sm" position="absolute" top={4} right={4} onClick={() => navigate("/equipuments")} color="black" bg="gray.300" _hover={{ bg: "gray.400"}}>
         戻る
      </Button>

      <Box display="flex" gap={8} alignItems="flex-start">
        {/* 画像 */}
        <Image
          src={`/images/${item.image_path || "noImage.jpg"}`}
          alt={item.name}
          boxSize="300px"
          objectFit="cover"
          cursor="pointer"
          onClick={() => setIsZoomed(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/noImage.jpg";
          }}
        />

        {/* 情報パネル */}
        <Box flex="1">
        <Text fontSize="lg" mb={2}>
            保管場所: {isEditing ? (
              <Input
                value={updatedItem?.location || ""}
                onChange={(e) => setUpdatedItem({ ...updatedItem!, location: e.target.value })}
                bg="white"
              />
            ) : (
              item.location || "不明"
            )}
          </Text>

          <Text fontSize="lg" mb={2}>
            備考: {isEditing ? (
              <Input
                value={updatedItem?.notes || ""}
                onChange={(e) => setUpdatedItem({ ...updatedItem!, notes: e.target.value })}
                bg="white"
              />
            ) : (
              item.notes || "備考なし"
            )}
          </Text>

          {/* 編集ボタン */}
          <Button mt={6} color="black" bg="blue.300" _hover={{ bg: "blue.400" }} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "保存" : "編集"}
          </Button>

          {/* 編集モードの場合のみ保存ボタン表示 */}
          {isEditing && (
            <Button mt={2} color="black" bg="green.300" _hover={{ bg: "green.400" }} onClick={handleSaveEdit}>
              保存
            </Button>
          )}

          {/* キャンセルボタン */}
          {isEditing && (
            <Button
              mt={2}
              color="black"
              bg="red.300"
              _hover={{ bg: "red.400" }}
              onClick={handleCancelEdit}
            >
              キャンセル
            </Button>
          )}

          <Box mt={4}>
            <Text mb={2}>登録理由:</Text>
            <Input
              placeholder="登録理由を入力"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              bg="white"
            />
          </Box>

          {item.is_available && (
            <Button mt={6} color="black" bg="gray.300" _hover={{ bg: "gray.400"}} onClick={handleBorrow}>
              借りる
            </Button>
          )}

        </Box>
      </Box>

      {/* 拡大表示（Modalの代替） */}
      {isZoomed && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="blackAlpha.800"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1000"
          onClick={() => setIsZoomed(false)}
        >
          <Image
            src={`/images/${item.image_path || "noImage.jpg"}`}
            alt={item.name}
            maxW="90%"
            maxH="90%"
            objectFit="contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/noImage.jpg";
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ItemDetailPage;
